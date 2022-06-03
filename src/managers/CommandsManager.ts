import {
  Collection,
  type ApplicationCommand,
  type ApplicationCommandData,
  type ApplicationCommandResolvable,
  type GuildResolvable,
  ApplicationCommandType,
  type Snowflake,
} from 'discord.js';
import { BaseManager, ShewenyInformation, type ShewenyClient, type Command } from '../index';
import { COMMAND_TYPE } from '../constants/constants';
import { Loader } from '../utils/Loader';
import type { CommandsManagerOptions, CommandsManagerDefaultOptions } from '../typescript';

/**
 * Manager for Commands
 * @extends {EventEmitter}
 */
export class CommandsManager extends BaseManager {
  /**
   * If the applications commands are disabled according to the `userPermissions` array
   * @type {boolean | undefined}
   */
  public applicationPermissions?: boolean;

  /**
   * Register application commands
   * @type {boolean}
   */
  public autoRegisterApplicationCommands: boolean;

  /**
   * Collection of the commands
   * @type {Collection<string, Command> | undefined}
   */
  public commands?: Collection<string, Command> | null;

  /**
   * Default data for the commands
   * @type {CommandsManagerDefaultOptions}
   */
  public default: CommandsManagerDefaultOptions;

  /**
   * ID of the guild where are set Applications Commands
   * @type {string | undefined}
   */
  public guildId?: Snowflake | Snowflake[];

  /**
   * Prefix for the Message Commands
   * @type {string | undefined}
   */
  public prefix?: string;

  /**
   * Constructor to manage commands
   * @param {ShewenyClient} client Client framework
   * @param {CommandsManagerOptions} [options] Options of the commands manager
   */
  constructor(client: ShewenyClient, options: CommandsManagerOptions) {
    super(client, options);

    this.applicationPermissions = options?.applicationPermissions || false;
    this.autoRegisterApplicationCommands = options?.autoRegisterApplicationCommands || false;
    this.default = {
      adminOnly: options.default?.adminOnly,
      category: options.default?.category,
      channel: options.default?.channel,
      clientPermissions: options.default?.clientPermissions,
      cooldown: options.default?.cooldown,
      examples: options.default?.examples,
      type: options.default?.type,
      usage: options.default?.usage,
      userPermissions: options.default?.userPermissions,
    };
    this.guildId = options?.guildId;
    this.prefix = options?.prefix;
  }

  /**
   * Create a command in the client's application commands
   * @param {Command} command Command to create
   * @param {Snowflake | undefined} [guildId] Guild ID where the order will be created
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
   */
  public async createCommand(
    command: Command,
    guildId?: Snowflake,
  ): Promise<ApplicationCommand<Record<string, unknown>> | ApplicationCommand<{ guild: GuildResolvable }> | undefined> {
    if (!command) throw new Error('Command not found');

    const data = this.getApplicationCommandData(command) as ApplicationCommandData;
    if (!data) return undefined;

    return guildId ? this.client.application?.commands.create(data, guildId) : this.client.application?.commands.create(data);
  }

  /**
   * Delete all commands from the client's application commands
   * @param {Snowflake | undefined} [guildId] Guild ID where all commands will be deleted
   * @returns {Promise<Collection<string, ApplicationCommand<{}>> | Collection<string, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
   */
  public async deleteAllCommands(
    guildId?: Snowflake,
  ): Promise<
    | Collection<string, ApplicationCommand<Record<string, unknown>>>
    | Collection<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    return guildId ? this.client.application?.commands.set([], guildId) : this.client.application?.commands.set([]);
  }

  /**
   * Removes an command from the client's application commands
   * @param {ApplicationCommandResolvable} command Command deleted
   * @param {Snowflake | undefined} [guildId] Guild ID where the command will be deleted
   * @returns {Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined>}
   */
  public async deleteCommand(
    command: ApplicationCommandResolvable,
    guildId?: Snowflake,
  ): Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined> {
    if (!command) throw new Error('Command not found');

    return guildId
      ? this.client.application?.commands.delete(command, guildId)
      : this.client.application?.commands.delete(command);
  }

  /**
   * Edit an command with a new command in the client's application commands
   * @param {ApplicationCommandResolvable} oldCommand Command edited
   * @param {Command} newCommand The new command that will take the place of the old one
   * @param {Snowflake | undefined} [guildId] Guild ID where the order will be edited
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
   */
  public async editCommand(
    oldCommand: ApplicationCommandResolvable,
    newCommand: Command,
    guildId?: Snowflake,
  ): Promise<ApplicationCommand<Record<string, unknown>> | ApplicationCommand<{ guild: GuildResolvable }> | undefined> {
    if (!oldCommand) throw new Error('Old Command not found');
    if (!newCommand) throw new Error('New Command not found');

    const data = this.getApplicationCommandData(newCommand) as ApplicationCommandData;
    if (!data) return undefined;

    return guildId
      ? this.client.application?.commands.edit(oldCommand, data, guildId)
      : this.client.application?.commands.edit(oldCommand, data);
  }

  /**
   * Get data of Application Command
   * @param {Collection<string, Command> | Command | undefined} [commands] The command(s) to obtain their data
   * @returns {ApplicationCommandData[] | ApplicationCommandData | undefined}
   */
  public getApplicationCommandData(
    commands: Collection<string, Command> | Command | undefined | null = this.commands,
  ): ApplicationCommandData[] | ApplicationCommandData | null {
    if (!commands) throw new Error('Commands not found');

    if (commands instanceof Collection) {
      const data: ApplicationCommandData[] = [];
      for (const [, cmd] of commands) {
        if (cmd.type === COMMAND_TYPE.cmdMsg) continue;

        const newType = this.renameCommandType(cmd.type);
        if (!newType) continue;

        if (cmd.type === COMMAND_TYPE.cmdSlash) {
          data.push({
            type: newType,
            name: cmd.name,
            description: cmd.description,
            options: cmd.options,
            defaultPermission:
              this.applicationPermissions && this.guildId && (cmd.userPermissions?.length > 0 || cmd.adminsOnly)
                ? false
                : cmd.defaultPermission,
          });
        } else if (cmd.type === COMMAND_TYPE.ctxMsg || cmd.type === COMMAND_TYPE.ctxUser) {
          // eslint-disable-next-line
          // @ts-ignore
          data.push({
            type: newType,
            name: cmd.name,
            // description : A context menu command doesn't have a description
            defaultPermission:
              this.applicationPermissions && this.guildId && (cmd.userPermissions?.length > 0 || cmd.adminsOnly)
                ? false
                : cmd.defaultPermission,
          });
        }
      }

      return data as ApplicationCommandData[];
    } else {
      if (commands.type === COMMAND_TYPE.cmdMsg) return null;

      const newType = this.renameCommandType(commands.type);
      if (!newType) return null;

      if (commands.type === COMMAND_TYPE.cmdSlash) {
        return {
          type: newType,
          name: commands.name,
          description: commands.description,
          options: commands.options,
          defaultPermission:
            this.applicationPermissions && this.guildId && commands.userPermissions.length > 0
              ? false
              : commands.defaultPermission,
        } as ApplicationCommandData;
      } else if (commands.type === COMMAND_TYPE.ctxMsg || commands.type === COMMAND_TYPE.ctxUser) {
        return {
          type: newType,
          name: commands.name,
          defaultPermission:
            this.applicationPermissions && this.guildId && commands.userPermissions.length > 0
              ? false
              : commands.defaultPermission,
        } as ApplicationCommandData;
      }
    }
    return null;
  }

  /**
   * Load all commands in collection
   * @returns {Promise<Collection<string, Command>>}
   */
  public async loadAll(): Promise<Collection<string, Command> | undefined> {
    const loader = new Loader<string, Command>(this.client, this.directory, 'name');
    this.commands = await loader.load();
    new ShewenyInformation(this.client, `- Commands loaded : ${this.commands.size}`);

    // Register
    const commandsToRegister = this.commands?.filter(
      (cmd: Command) => cmd.type == COMMAND_TYPE.cmdSlash || cmd.type == COMMAND_TYPE.ctxMsg || cmd.type == COMMAND_TYPE.ctxUser,
    );
    if (commandsToRegister && this.autoRegisterApplicationCommands) await this.registerApplicationCommands(commandsToRegister);

    return this.commands;
  }

  /**
   * Set all application commands from the collection of commands in the client application
   * @param {Collection<string, Command> | undefined} [commands] Collection of the commands
   * @returns {Promise<Collection<Snowflake, ApplicationCommand<{}>> | Collection<Snowflake, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
   */
  public async registerApplicationCommands(
    commands: Collection<string, Command> | undefined | null = this.commands,
    guildId: Snowflake | Snowflake[] | undefined = this.guildId,
  ): Promise<
    | Collection<Snowflake, ApplicationCommand<Record<string, unknown>>>
    | Collection<Snowflake, ApplicationCommand<{ guild: GuildResolvable }>>
    | boolean
    | undefined
  > {
    if (guildId && guildId instanceof Array) return guildId.every(id => this.registerApplicationCommands(commands, id));
    if (!commands) throw new Error('Commands not found');
    const data = this.getApplicationCommandData();

    await this.client.awaitReady();

    if (data instanceof Array && data.length > 0) {
      const cmds =
        guildId && typeof guildId === 'string'
          ? await this.client.application?.commands.set(data, guildId)
          : await this.client.application?.commands.set(data);
      return cmds;
    }
    return undefined;
  }

  /**
   * Rename command type to the type of Application command
   * @param {"SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"} type Type of command
   * @returns {ApplicationCommandType | undefined}
   */
  private renameCommandType(
    type: typeof COMMAND_TYPE.cmdSlash | typeof COMMAND_TYPE.ctxUser | typeof COMMAND_TYPE.ctxMsg,
  ): ApplicationCommandType | undefined {
    if (type === COMMAND_TYPE.cmdSlash) return ApplicationCommandType.ChatInput;
    if (type === COMMAND_TYPE.ctxMsg) return ApplicationCommandType.Message;
    if (type === COMMAND_TYPE.ctxUser) return ApplicationCommandType.User;
    return undefined;
  }

  /**
   * Unload all commands
   * @returns {void}
   */
  public unloadAll(): void {
    this.commands = null;
    this.client.collections.commands.clear();
  }
}
