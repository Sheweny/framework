import { Collection } from 'discord.js';
import { BaseStructure, ShewenyError } from '../index';
import { COMMAND_CHANNEL, COMMAND_TYPE } from '../constants/constants';
import type { ShewenyClient, CommandsManager } from '../index';
import type {
  // Interfaces
  MessageCommandOptionData,
  CommandMessageArgsResolved,
  ContextMenuMessageData,
  ContextMenuUserData,
  SlashCommandData,
  MessageData,
  // Types
  CommandData,
  CommandType,
  // utilityTypes
  Awaitable
} from '../typescript';
import type {
  ApplicationCommandOptionData,
  CommandInteraction,
  ContextMenuCommandInteraction,
  Message,
  PermissionsString,
  AutocompleteInteraction,
} from 'discord.js';

/**
 * Represents an Command structure
 * @extends {BaseStructure}
 */
export abstract class Command extends BaseStructure {
  /**
   * If a command is reserved for bot admins
   * @type {boolean}
   */
  public adminsOnly: boolean;

  /**
   * Aliases of the Message command
   * @type {string[] | undefined}
   */
  public aliases?: string[];

  /**
   * Args of a Message command
   * @type {MessageCommandOptionData | undefined}
   */
  public args?: MessageCommandOptionData[];

  /**
   * Category of a command
   * @type {string}
   */
  public category: string;

  /**
   * Only channel where a command can be executed
   * @type {"GUILD" | "DM" | undefined}
   */
  public channel?: typeof COMMAND_CHANNEL.dm | typeof COMMAND_CHANNEL.global | typeof COMMAND_CHANNEL.guild;

  /**
   * The permissions required for the client
   * @type {PermissionsString[]}
   */
  public clientPermissions: PermissionsString[];

  /**
   * Cooldown of a command in seconds
   * @type {number}
   */
  public cooldown: number;

  /**
   * Default permission of a Application command
   * @type {boolean | undefined}
   */
  public defaultPermission?: boolean;

  /**
   * Description of a command
   * @type {string | undefined}
   */
  public description: string;

  /**
   * Examples of a command
   * @type {string}
   */
  public examples?: string | string[];

  /**
   * The
   * @type {CommandsManager}
   */
  public manager?: CommandsManager;

  /**
   * Name of a command
   * @type {string}
   */
  public name: string;

  /**
   * Options of a Application command
   * @type {ApplicationCommandOptionData[] | undefined}
   */
  public options?: ApplicationCommandOptionData[];

  /**
   * Type of a command
   * @type {CommandType}
   */
  public type: CommandType;

  /**
   * Usage of a command
   * @type {string}
   */
  public usage?: string | string[];

  /**
   * The permissions required to be executed by the user
   * @type {PermissionsString[]}
   */
  public userPermissions: PermissionsString[];

  /**
   * Constructor for build a Command
   * @param {ShewenyClient} client Client framework
   * @param {CommandData} data Data for build a Command
   */
  constructor(client: ShewenyClient, data: CommandData) {
    super(client);
    const defaultData = client.managers.commands?.default || {};
    const type = data.type || defaultData.type || COMMAND_TYPE.cmdMsg;

    this.adminsOnly = (data.adminsOnly || defaultData.adminOnly) ?? false;
    this.aliases = this.isType(type, COMMAND_TYPE.cmdMsg) ? (data as MessageData).aliases : [];
    this.args = this.isType(type, COMMAND_TYPE.cmdMsg) ? (data as MessageData).args : undefined;
    this.category = (data.category || defaultData.category) ?? '';
    this.channel = data.channel || defaultData.channel;
    this.clientPermissions = (data.clientPermissions || defaultData.clientPermissions) ?? [];
    this.cooldown = (data.cooldown || defaultData.cooldown) ?? 0;
    this.defaultPermission = this.isType(type, COMMAND_TYPE.cmdSlash, COMMAND_TYPE.ctxUser, COMMAND_TYPE.ctxMsg)
      ? (data as SlashCommandData | ContextMenuUserData | ContextMenuMessageData).defaultPermission
      : undefined;
    this.description = (data.description || defaultData.description) ?? '';
    this.examples = data.examples || defaultData.examples;
    this.manager = this.client.managers.commands;
    this.name = data.name;
    this.options = this.isType(type, COMMAND_TYPE.cmdSlash) ? (data as SlashCommandData).options : undefined;
    this.type = type;
    this.usage = data.usage || defaultData.usage;
    this.userPermissions = (data.userPermissions || defaultData.userPermissions) ?? [];
  }

  /**
   * This function is executed before executing the `execute` function
   * @param {CommandInteraction | ContextMenuCommandInteraction | Message} interaction Interaction
   * @returns {any | Promise<any>}
   */
  before?(interaction: CommandInteraction | ContextMenuCommandInteraction | Message): Awaitable<unknown>;

  /**
   * Main function `execute` for the commands
   * @param {CommandInteraction | ContextMenuCommandInteraction | Message} interaction Interaction
   * @param {CommandMessageArgsResolved[]} [args] Arguments of the Message command
   * @returns {any | Promise<any>}
   */
  abstract execute(
    interaction: CommandInteraction | ContextMenuCommandInteraction | Message,
    args?: CommandMessageArgsResolved[],
  ): Awaitable<unknown>;

  /**
   * Check the type of a command
   * @param type - Type of a command
   * @param types - Types allowed
   * @returns {boolean}
   */
  private isType(type: string, ...types: string[]): boolean {
    if (types.includes(type)) return true;
    return false;
  }

  /**
   *
   * @param {AutocompleteInteraction} interaction
   * @returns {any | Promise<any>}
   */
  onAutocomplete?(interaction: AutocompleteInteraction): Awaitable<unknown>;

  /**
   * Register a command in collections
   * @returns {Collection<string, ApplicationCommand>} The Application Commands collection
   */
  public async register(): Promise<Collection<string, Command> | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Command', this.name);
    const CommandImported = (await import(this.path)).default;
    const AC: Command = new CommandImported(this.client);
    return this.client.collections.commands
      ? this.client.collections.commands.set(AC.name, AC)
      : new Collection<string, Command>().set(AC.name, AC);
  }
  /**
   * Reload a command
   * @returns {Promise<Collection<string, Command> | ShewenyError>} The Application Commands collection
   */
  public async reload(): Promise<Collection<string, Command> | ShewenyError> {
    this.unregister();
    return this.register();
  }
  /**
   * Unregister a command from collections
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.commands?.delete(this.name);
    if (!this.path) return false;
    delete require.cache[require.resolve(this.path)];
    return true;
  }
}
