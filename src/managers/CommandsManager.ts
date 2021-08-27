import { Collection } from "collection-data";
import { join } from "path";
import type {
  Collection as CollectionDjs,
  ApplicationCommand,
  ApplicationCommandData,
  ApplicationCommandResolvable,
  GuildResolvable,
  ApplicationCommandPermissionData,
} from "discord.js";
import { EventEmitter } from "events";
import { readDirAndPush } from "../utils/readDirFiles";
import type { ShewenyClient, Command } from "..";

interface CommandsManagerOptions {
  guildId?: string;
  prefix?: string;
}

export class CommandsManager extends EventEmitter {
  private client: ShewenyClient;
  public directory: string;
  public guildId?: string;
  public prefix?: string;
  public commands?: Collection<string, Command>;

  constructor(
    client: ShewenyClient,
    directory: string,
    loadAll?: boolean,
    options?: CommandsManagerOptions
  ) {
    super();

    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;
    this.guildId = options?.guildId;
    this.prefix = options?.prefix;

    if (loadAll) this.loadAndRegisterAll();
    client.handlers.commands = this;
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
      if (!instance.name) continue;

      instance.path = cmdPath;
      commands.set(instance.name, instance);
    }

    this.client.collections.commands = commands;
    this.commands = commands;
    return commands;
  }

  public async loadAndRegisterAll(): Promise<void> {
    const commands = await this.loadAll();
    await this.registerAllApplicationCommands(commands);
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
        if (cmd.type === "MESSAGE") continue;

        const newType = this.renameCommandType(cmd.type);
        if (!newType) continue;

        if (cmd.type === "SLASH_COMMAND") {
          data.push({
            type: newType,
            name: cmd.name,
            description: cmd.description,
            options: cmd.options,
            defaultPermission:
              this.guildId && cmd.userPermissions.length > 0
                ? false
                : cmd.defaultPermission,
          });
        } else if (
          cmd.type === "CONTEXT_MENU_MESSAGE" ||
          cmd.type === "CONTEXT_MENU_USER"
        ) {
          data.push({
            type: newType,
            name: cmd.name,
            defaultPermission:
              this.guildId && cmd.userPermissions.length > 0
                ? false
                : cmd.defaultPermission,
          });
        }
      }

      return data as ApplicationCommandData[];
    } else {
      if (commands.type === "MESSAGE") return undefined;

      const newType = this.renameCommandType(commands.type);
      if (!newType) return undefined;

      if (commands.type === "SLASH_COMMAND") {
        return {
          type: newType,
          name: commands.name,
          description: commands.description,
          options: commands.options,
          defaultPermission:
            this.guildId && commands.userPermissions.length > 0
              ? false
              : commands.defaultPermission,
        } as ApplicationCommandData;
      } else if (
        commands.type === "CONTEXT_MENU_MESSAGE" ||
        commands.type === "CONTEXT_MENU_USER"
      ) {
        return {
          type: newType,
          name: commands.name,
          defaultPermission:
            this.guildId && commands.userPermissions.length > 0
              ? false
              : commands.defaultPermission,
        } as ApplicationCommandData;
      }
    }
  }

  public async registerAllApplicationCommands(
    commands: Collection<string, Command> | undefined = this.commands
  ): Promise<
    | CollectionDjs<string, ApplicationCommand<{}>>
    | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    if (!commands) throw new Error("Commands not found");
    const data = this.getData();

    await this.client.awaitReady();

    if (data instanceof Array && data.length > 0) {
      const cmds = this.guildId
        ? await this.client.application?.commands.set(data, this.guildId)
        : await this.client.application?.commands.set(data);

      if (this.guildId) {
        const guild = this.client.guilds.cache.get(this.guildId);

        const getRoles = (command: Command) => {
          const permissions = command.userPermissions;

          if (permissions?.length === 0) return null;
          return guild?.roles.cache.filter(
            (r) => r.permissions.has(permissions!) && !r.managed
          );
        };

        const fullPermissions = cmds?.reduce((accumulatorCmd: any, cmd) => {
          const command = commands.find((c) => c.name === cmd.name);
          const roles = getRoles(command!);
          if (!roles) return accumulatorCmd;

          let permissions = roles.reduce(
            (accumulatorRole: any, role): ApplicationCommandPermissionData[] => {
              return [
                ...accumulatorRole,
                {
                  id: role.id,
                  type: "ROLE",
                  permission: true,
                },
              ];
            },
            []
          ) as ApplicationCommandPermissionData[];

          if (command?.adminsOnly && this.client.admins.length > 0)
            permissions.concat(
              this.client.admins.map((id) => ({ id, type: "USER", permission: true }))
            );

          return [
            ...accumulatorCmd,
            {
              id: cmd.id,
              permissions,
            },
          ];
        }, []);

        await guild?.commands.permissions.set({ fullPermissions });
      }

      return cmds;
    }

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
    | CollectionDjs<string, ApplicationCommand<{}>>
    | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    return guildId
      ? this.client.application?.commands.set([], guildId)
      : this.client.application?.commands.set([]);
  }
}
