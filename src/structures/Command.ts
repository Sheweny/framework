import { BaseStructure } from './index.js';
import { ShewenyError } from '../helpers/index.js';
import { COMMAND_CHANNEL, COMMAND_TYPE } from '../constants/constants.js';
import type { ShewenyClient } from '../client/Client.js';
import type {
  // Interfaces
  MessageCommandOptionData,
  CommandMessageArgsResolved,
  SlashCommandData,
  MessageData,
  // Types
  CommandData,
  ContextMenuMessageData,
  ContextMenuUserData,
  CommandType,
  // utilityTypes
  Awaitable,
} from '../typescript/index.js';
import type {
  ApplicationCommandOptionData,
  CommandInteraction,
  ContextMenuCommandInteraction,
  Message,
  AutocompleteInteraction,
  PermissionResolvable,
  LocalizationMap,
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
   * @type {PermissionResolvable[]}
   */
  public clientPermissions: PermissionResolvable[];

  /**
   * Cooldown of a command in seconds
   * @type {number}
   */
  public cooldown: number;

  /**
   * Description of a command
   * @type {string | undefined}
   */
  public description: string;

  /**
   * Description of a command
   * @type {string | undefined}
   */
  public descriptionLocalizations?: LocalizationMap;

  /**
   * Examples of a command
   * @type {string}
   */
  public examples?: string | string[];

  /**
   * Name of a command
   * @type {string}
   */
  public name: string;

  /**
   * Name of a command
   * @type {string}
   */
  public nameLocalizations?: LocalizationMap;

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
   * @type {PermissionResolvable[]}
   */
  public userPermissions: PermissionResolvable[];

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
    this.description = (data.description || defaultData.description) ?? '';
    this.examples = data.examples || defaultData.examples;
    this.name = data.name;
    (this.nameLocalizations = !this.isType(type, COMMAND_TYPE.cmdMsg)
      ? (data as SlashCommandData | ContextMenuUserData | ContextMenuMessageData).nameLocalizations || undefined
      : undefined),
      (this.options = this.isType(type, COMMAND_TYPE.cmdSlash) ? (data as SlashCommandData).options : undefined);
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
  public async register(): Promise<Command | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Command', this.name);
    const CommandImported = (await import(this.path)).default;
    const cmd: Command = new CommandImported(this.client);
    return cmd;
  }
  /**
   * Reload a command
   * @returns {Promise<Collection<string, Command> | ShewenyError>} The Application Commands collection
   */
  public async reload(): Promise<Command | ShewenyError> {
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
