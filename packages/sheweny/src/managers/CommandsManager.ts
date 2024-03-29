import {
  Collection,
  type ApplicationCommand,
  type ApplicationCommandData,
  type ApplicationCommandResolvable,
  type GuildResolvable,
  ApplicationCommandType,
  type Snowflake,
} from 'discord.js';
import { Loader } from '../utils/Loader.js';
import { ShewenyInformation } from '../helpers/index.js';
import { BaseManager } from './index.js';
import { COMMANDS_MANAGER_STRATEGY, COMMAND_CHANNEL, COMMAND_TYPE } from '../constants/constants.js';
import { Command } from '../structures/index.js';
import type { ShewenyClient } from '../client/Client.js';
import type {
  CommandsManagerOptions,
  CommandsManagerDefaultOptions,
  MessageCommandPrefix,
  CommandManagerRegisterStrategy,
} from '../typescript/index.js';
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
   * @type {Collection<string, Command[]> | undefined}
   */
  public commands?: Collection<string, Command[]>;

  /**
   * Default data for the commands
   * @type {CommandsManagerDefaultOptions}
   */
  public default: CommandsManagerDefaultOptions;

  /**
   * ID of the guild where are set Applications Commands
   * @type {Snowflake | Snowflake[] | undefined}
   */
  public guildId?: Snowflake | Snowflake[];

  /**
   * Prefix for the Message Commands
   * @type {string | undefined}
   */
  public prefix?: MessageCommandPrefix;

  /**
   * The strategy for register application commands
   * @type {CommandManagerRegisterStrategy}
   */
  public registerStrategy?: CommandManagerRegisterStrategy;

  /**
   * Constructor of commands manager
   * @param {ShewenyClient} client Client framework
   * @param {CommandsManagerOptions} [options] Options of the commands manager
   */
  constructor(client: ShewenyClient, options: CommandsManagerOptions) {
    super(client, options);

    this.applicationPermissions = options?.applicationPermissions || false;
    this.autoRegisterApplicationCommands = options?.autoRegisterApplicationCommands || false;
    this.default = {
      adminOnly: options.default?.adminOnly,
      registerApplicationCommand: options.default?.registerApplicationCommand,
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
    this.registerStrategy = options.registerStrategy || COMMANDS_MANAGER_STRATEGY.set;
  }

  /**
   * Create a command in the client's application commands
   * @param {Command} [command] Command to create
   * @param {Snowflake | undefined} [guildId] Guild ID where the order will be created
   * @returns {Promise<ApplicationCommand<Record<string, unknown>> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
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
   * Get data of application command
   * @param {Command} [command] The command to obtain data
   * @returns {ApplicationCommandData | null}
   */
  public getApplicationCommandData(command: Command): ApplicationCommandData | null {
    if (!command) return null;
    if (command.type === COMMAND_TYPE.cmdMsg) return null;

    const newType = this.renameCommandType(command.type);
    if (!newType) return null;
    const base: ApplicationCommandData = {
      type: newType,
      name: command.name,
      nameLocalizations: command.nameLocalizations,
      description: '',
      defaultMemberPermissions: undefined,
      dmPermission: undefined,
    };
    if (this.applicationPermissions) {
      base.defaultMemberPermissions = command.userPermissions;
      base.dmPermission = command.channel === COMMAND_CHANNEL.dm || command.channel === COMMAND_CHANNEL.global ? true : false;
    }
    if (command.type === COMMAND_TYPE.cmdSlash) {
      return {
        ...base,
        description: command.description,
        descriptionLocalizations: command.descriptionLocalizations,
        options: command.options,
      } as ApplicationCommandData;
    }

    if (command.type === COMMAND_TYPE.ctxMsg || command.type === COMMAND_TYPE.ctxUser) {
      return {
        ...base,
      } as ApplicationCommandData;
    }

    return null;
  }

  /**
   * Get an array of ApplicationCommandData from a collection of commands;
   * @param {Collection<string, Command>} [commands] The commandsToRegister
   * @returns {ApplicationCommandData[] | null}
   */
  public getAllApplicationCommandData(commands: Collection<string, Command[]>): ApplicationCommandData[] | null {
    if (!commands || (commands && !commands.size)) return null;
    const data: ApplicationCommandData[] = [];
    for (const [, structures] of commands) {
      if (!structures || !structures.length) continue;
      for (const command of structures) {
        const commandData = this.getApplicationCommandData(command);
        if (commandData && command.registerApplicationCommand) data.push(commandData);
      }
    }
    if (data.length) return data;
    return null;
  }

  /**
   * Load all commands in collection
   * @returns {Promise<Collection<string, Command[] | undefined>}
   */
  public async loadAll(): Promise<Collection<string, Command[]> | undefined> {
    const loader = new Loader<'name', string, Command>(this.client, this.directory, 'name', {
      manager: this,
      instance: Command,
      asyncRead: this.asyncRead,
    });
    this.commands = await loader.load();
    new ShewenyInformation(this.client, `- Commands loaded : ${this.commands.size}`);

    if (this.commands?.size && this.autoRegisterApplicationCommands) {
      await this.registerApplicationCommands(this.commands, this.guildId);
    }

    return this.commands;
  }

  /**
   * Set all application commands from the collection of commands in the client application
   * @param {Collection<string, Command> | undefined} [commands] Collection of the commands
   * @returns {Promise<Collection<Snowflake, ApplicationCommand<{}>> | Collection<Snowflake, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
   */
  public async registerApplicationCommands(
    commands: Collection<string, Command[]>,
    guildId?: Snowflake | Snowflake[],
  ): Promise<boolean | undefined> {
    if (guildId && guildId instanceof Array) return guildId.every(id => this.registerApplicationCommands(commands, id));
    if (!commands) throw new Error('Commands not found');
    const data = this.getAllApplicationCommandData(commands);
    if (!data || (data && !data.length)) return;
    await this.client.awaitReady();
    if (this.registerStrategy === COMMANDS_MANAGER_STRATEGY.set) {
      if (guildId) await this.client.application?.commands.set(data, guildId);
      else await this.client.application?.commands.set(data);
    }
    if (this.registerStrategy === COMMANDS_MANAGER_STRATEGY.create) {
      for (const command of data) {
        if (guildId) await this.client.application?.commands.create(command, guildId);
        else await this.client.application?.commands.create(command);
      }
    }
    return true;
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
    this.commands = new Collection();
    this.client.collections.commands.clear();
  }
}
