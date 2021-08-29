import { Collection } from "collection-data";
import {
  ApplicationCommandResolvable,
  ApplicationCommandData,
  ApplicationCommand as ApplicationCommandDjs,
  GuildResolvable,
  Collection as CollectionDjs,
  Client,
} from "discord.js";
import { ShewenyClient } from "../ShewenyClient";
import { ApplicationCommand } from "../structures";
import { join } from "path";
import { readDirAndPush } from "../util/readDirFiles";
import { EventEmitter } from "events";
import type { ILoadAllApplicationCommand } from "../typescript/interfaces/interfaces";

/**
 * Create Application Command handler
 * @class Application Command Handler
 */
export class ApplicationCommandsHandler extends EventEmitter {
  private applicationCommands?: Collection<string, ApplicationCommand>;
  private client: ShewenyClient | Client;
  private dir: string;
  /**
   * @constructor
   * @param {ShewenyClient | Client} client - The client
   */
  constructor(
    client: ShewenyClient | Client,
    directory: string,
    loadAll?: ILoadAllApplicationCommand
  ) {
    super();
    if (!client)
      throw new ReferenceError("Client must be provided for use Application handler.");
    if (!directory) throw new TypeError("Directory must be provided.");
    this.dir = directory;
    this.client = client;
    this.applicationCommands =
      client instanceof ShewenyClient ? client.commands.interaction! : undefined;
    if (loadAll?.loadAll) this.loadAllAndRegister(loadAll?.guildId);
    if (client && client instanceof ShewenyClient)
      client.handlers.applicationCommands = this;
  }

  /**
   * Load all commands and register them to a collection.
   * @public
   * @async
   * @param {string} [guildId] - The guild to register command
   * @returns {Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  public async loadAllAndRegister(
    guildId?: string
  ): Promise<
    | CollectionDjs<string, ApplicationCommandDjs<{}>>
    | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable }>>
    | undefined
  > {
    const commands = await this.loadAll();
    return this.registerCommands(commands, guildId);
  }

  /**
   * Load all commands and register them to a collection.
   * @public
   * @async
   * @returns {Promise<Collection<string, ApplicationCommand>>} The collection of commands
   */
  public async loadAll(): Promise<Collection<string, ApplicationCommand>> {
    const commands: Collection<string, ApplicationCommand> = new Collection();
    const baseDir = join(require.main!.path, this.dir);
    const cmds: string[] = await readDirAndPush(baseDir);
    for (const cmdPath of cmds) {
      let Cmd = await import(cmdPath);
      if (Object.keys(Cmd).length) {
        const key = Object.keys(Cmd)[0];
        Cmd = Cmd[key];
      }
      if (!Cmd) continue;
      const instance: ApplicationCommand = new Cmd(this.client);
      if (!instance.data.name) continue;
      instance.path = cmdPath;
      commands.set(instance.data.name, instance);
    }
    if (this.client instanceof ShewenyClient) this.client.commands.interaction = commands;
    return commands;
  }

  /**
   * Get an array of application commands configuration for register it
   * @public
   * @param {Collection<string, ApplicationCommand>} applicationCommands - The application commands
   * @returns {ApplicationCommandData[]}
   */
  public getData(
    applicationCommands: Collection<string, ApplicationCommand>
  ): ApplicationCommandData[] {
    const data: ApplicationCommandData[] = [];
    applicationCommands.forEach((e) => data.push(e.data));

    return data;
  }

  /**
   * Register application commands
   * @public
   * @async
   * @param {Collection<string, ApplicationCommand>} applicationCommands - The application commands to register
   * @param {string} [guildId] - The guild to register context menus
   * @returns {Promise<CollectionDjs<string, ApplicationCommand<{}>> | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  public async registerCommands(
    applicationCommands: Collection<string, ApplicationCommand> | undefined = this
      .applicationCommands,
    guildId?: string
  ): Promise<
    | CollectionDjs<string, ApplicationCommandDjs<{}>>
    | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable }>>
    | undefined
  > {
    if (this.client instanceof ShewenyClient) await this.client.awaitReady();
    if (!applicationCommands)
      throw new ReferenceError(
        "ApplicationCommand Collection must be provided for use Application Command handler."
      );

    const data = this.getData(applicationCommands);
    if (data && data.length > 0) {
      return guildId
        ? this.client.application?.commands.set(data, guildId)
        : this.client.application?.commands.set(data);
    }
    return undefined;
  }

  /**
   * Create a Application Command
   * @public
   * @async
   * @param {Command} applicationCommand - The application command to register
   * @param {string} [guildId] - The guild to register command
   * @returns {Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  public async createCommand(
    applicationCommand: ApplicationCommand,
    guildId?: string
  ): Promise<
    | ApplicationCommandDjs<{}>
    | ApplicationCommandDjs<{ guild: GuildResolvable }>
    | undefined
  > {
    if (this.client instanceof ShewenyClient) await this.client.awaitReady();

    return guildId
      ? this.client.application?.commands.create(applicationCommand.data, guildId)
      : this.client.application?.commands.create(applicationCommand.data);
  }

  /**
   * Edit a application command
   * @public
   * @async
   * @param {ApplicationCommandResolvable} oldCommand - The command to edit
   * @param {ApplicationCommand} newCommand - The new application command to edit
   * @param {string} [guildId] - The guild to edit command
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>} The application commands
   */
  public async editCommand(
    oldCommand: ApplicationCommandResolvable,
    newCommand: ApplicationCommand,
    guildId?: string
  ): Promise<
    | ApplicationCommandDjs<{}>
    | ApplicationCommandDjs<{ guild: GuildResolvable }>
    | undefined
  > {
    if (this.client instanceof ShewenyClient) await this.client.awaitReady();

    return guildId
      ? this.client.application?.commands.edit(oldCommand, newCommand.data, guildId)
      : this.client.application?.commands.edit(oldCommand, newCommand.data);
  }

  /**
   * Delete application command
   * @public
   * @async
   * @param {ApplicationCommandResolvable} command - The command to delete
   * @param {string} [guildId] - The guild to delete command
   * @returns {Promise<ApplicationCommandDjs<{}> | ApplicationCommandDjs<{ guild: GuildResolvable }> | undefined>} Delete function
   */
  public async deleteCommand(
    command: ApplicationCommandResolvable,
    guildId?: string
  ): Promise<ApplicationCommandDjs<{ guild: GuildResolvable }> | null | undefined> {
    if (this.client instanceof ShewenyClient) await this.client.awaitReady();
    return guildId
      ? this.client.application?.commands.delete(command, guildId)
      : this.client.application?.commands.delete(command);
  }

  /**
   * Delete all application commands
   * @public
   * @async
   * @param {string} [guildId] - The guild to delete commands
   * @returns {Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  public async deleteAllCommands(
    guildId?: string
  ): Promise<
    | CollectionDjs<string, ApplicationCommandDjs<{}>>
    | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable }>>
    | undefined
  > {
    return guildId
      ? this.client.application?.commands.set([], guildId)
      : this.client.application?.commands.set([]);
  }
}
