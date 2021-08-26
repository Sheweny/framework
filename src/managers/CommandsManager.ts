import {
  ApplicationCommand,
  ApplicationCommandData,
  ApplicationCommandResolvable,
  Collection,
  GuildResolvable,
} from "discord.js";
import { join } from "path";
import { ShewenyClient } from "../client/Client";
import { Command } from "../structures/Command";
import { readDirAndPush } from "../utils/readDirFiles";

export class CommandsManager {
  private client: ShewenyClient;
  private directory: string;
  private guildId?: string;
  public commands?: Collection<string, Command>;

  constructor(
    client: ShewenyClient,
    directory: string,
    loadAll?: boolean,
    guildId?: string
  ) {
    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;
    this.guildId = guildId;

    if (loadAll) this.loadAndRegisterAll();
    client.handlers.manager.commands = this;
  }

  public async loadAll(): Promise<Collection<string, Command>> {
    const commands: Collection<string, Command> = new Collection();
    const baseDir = join(require.main!.path, this.directory);
    const cmdsPath = await readDirAndPush(baseDir);

    for (const cmdPath of cmdsPath) {
      const cmdImport = await import(cmdPath);
      const key = Object.keys(cmdImport)[0];
      const Command = cmdImport[key];
      if (!Command) continue;
      const instance: Command = new Command(this.client);
      if (!instance.data.name) continue;
      instance.path = cmdPath;
      commands.set(instance.data.name, instance);
    }

    this.client.handlers.collections.commands = commands;
    this.commands = commands;
    return commands;
  }

  public async loadAndRegisterAll(): Promise<void> {
    const commands = await this.loadAll();
    await this.registerAllApplicationCommands(commands, this.guildId);
  }

  private renameCommandType(
    type: "SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"
  ): "CHAT_INPUT" | "MESSAGE" | "USER" | undefined {
    if (type === "SLASH_COMMAND") return "CHAT_INPUT";
    if (type === "CONTEXT_MENU_MESSAGE") return "MESSAGE";
    if (type === "CONTEXT_MENU_USER") return "USER";
    return undefined;
  }

  public getData(
    commands: Collection<string, Command> | Command | undefined = this.commands
  ): ApplicationCommandData[] | ApplicationCommandData | undefined {
    if (!commands) throw new Error("Commands not found");

    if (commands instanceof Collection) {
      const data: any[] = [];
      for (let [, cmd] of commands) {
        if (cmd.data.type === "MESSAGE") continue;

        const newType = this.renameCommandType(cmd.data.type);
        if (!newType) continue;

        if (cmd.data.type === "SLASH_COMMAND") {
          data.push({
            type: newType,
            name: cmd.data.name,
            description: cmd.data.description,
            options: cmd.data.options,
            defaultPermission: cmd.data.defaultPermission,
          });
        } else if (
          cmd.data.type === "CONTEXT_MENU_MESSAGE" ||
          cmd.data.type === "CONTEXT_MENU_USER"
        ) {
          data.push({
            type: newType,
            name: cmd.data.name,
            defaultPermission: cmd.data.defaultPermission,
          });
        }
      }

      return data as ApplicationCommandData[];
    } else {
      if (commands.data.type === "MESSAGE") return undefined;

      const newType = this.renameCommandType(commands.data.type);
      if (!newType) return undefined;

      if (commands.data.type === "SLASH_COMMAND") {
        return {
          type: newType,
          name: commands.data.name,
          description: commands.data.description,
          options: commands.data.options,
          defaultPermission: commands.data.defaultPermission,
        } as ApplicationCommandData;
      } else if (
        commands.data.type === "CONTEXT_MENU_MESSAGE" ||
        commands.data.type === "CONTEXT_MENU_USER"
      ) {
        return {
          type: newType,
          name: commands.data.name,
          defaultPermission: commands.data.defaultPermission,
        } as ApplicationCommandData;
      }
    }
  }

  public async registerAllApplicationCommands(
    commands: Collection<string, Command> | undefined = this.commands,
    guildId?: string
  ): Promise<
    | Collection<string, ApplicationCommand<{}>>
    | Collection<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    if (!commands) throw new Error("Commands not found");

    const data = this.getData();
    if (data instanceof Array && data.length > 0)
      return guildId
        ? this.client.application?.commands.set(data, guildId)
        : this.client.application?.commands.set(data);

    return undefined;
  }

  public async createCommand(
    command: Command,
    guildId?: string
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  > {
    if (!command) throw new Error("Command not found");

    const data = this.getData(command) as ApplicationCommandData;
    if (!data) return undefined;

    return guildId
      ? this.client.application?.commands.create(data, guildId)
      : this.client.application?.commands.create(data);
  }

  public async editCommand(
    oldCommand: ApplicationCommandResolvable,
    newCommand: Command,
    guildId?: string
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  > {
    if (!oldCommand) throw new Error("Old Command not found");
    if (!newCommand) throw new Error("New Command not found");

    const data = this.getData(newCommand) as ApplicationCommandData;
    if (!data) return undefined;

    return guildId
      ? this.client.application?.commands.edit(oldCommand, data, guildId)
      : this.client.application?.commands.edit(oldCommand, data);
  }

  public async deleteCommand(
    command: ApplicationCommandResolvable,
    guildId?: string
  ): Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined> {
    if (!command) throw new Error("Command not found");

    return guildId
      ? this.client.application?.commands.delete(command, guildId)
      : this.client.application?.commands.delete(command);
  }

  public async deleteAllCommands(
    guildId?: string
  ): Promise<
    | Collection<string, ApplicationCommand<{}>>
    | Collection<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    return guildId
      ? this.client.application?.commands.set([], guildId)
      : this.client.application?.commands.set([]);
  }
}
