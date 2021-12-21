import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import { COMMAND_CHANNEL, COMMAND_TYPE } from '../constants/constants';
import type { ShewenyClient } from '../client/Client';
import type {
  MessageCommandOptionData,
  CommandMessageArgsResolved,
  ContextMenuMessageData,
  ContextMenuUserData,
  SlashCommandData,
  MessageData,
} from '../typescript/interfaces';
import type { CommandData, CommandType } from '../typescript/types';
import type {
  ApplicationCommandOptionData,
  CommandInteraction,
  ContextMenuInteraction,
  Message,
  PermissionString,
  AutocompleteInteraction,
} from 'discord.js';
import type { CommandsManager } from '..';

/**
 * Represents an Command structure
 * @extends {BaseStructure}
 */
export abstract class Command extends BaseStructure {
  /**
   * Name of a command
   * @type {string}
   */
  public name: string;

  /**
   * Description of a command
   * @type {string | undefined}
   */
  public description?: string;

  /**
   * Type of a command
   * @type {CommandType}
   */
  public type: CommandType;

  /**
   * Default permission of a Application command
   * @type {boolean | undefined}
   */
  public defaultPermission?: boolean;

  /**
   * Options of a Application command
   * @type {ApplicationCommandOptionData[] | undefined}
   */
  public options?: ApplicationCommandOptionData[];

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
   * Usage of a command
   * @type {string}
   */
  public usage?: string | string[];

  /**
   * Examples of a command
   * @type {string}
   */
  public examples?: string | string[];

  /**
   * Only channel where a command can be executed
   * @type {"GUILD" | "DM" | undefined}
   */
  public channel?: typeof COMMAND_CHANNEL.guild | typeof COMMAND_CHANNEL.dm;

  /**
   * Cooldown of a command in seconds
   * @type {number}
   */
  public cooldown: number;

  /**
   * If a command is reserved for bot admins
   * @type {boolean}
   */
  public adminsOnly: boolean;

  /**
   * The permissions required to be executed by the user
   * @type {PermissionString[]}
   */
  public userPermissions: PermissionString[];

  /**
   * The permissions required for the client
   * @type {PermissionString[]}
   */
  public clientPermissions: PermissionString[];

  /**
   * Aliases of the Message command
   * @type {string[] | undefined}
   */
  public aliases?: string[];

  /**
   * Cooldowns collection
   * @type {Collection<string, Collection<string, number>>}
   */
  public cooldowns: Collection<string, Collection<string, number>>;

  /**
   * The
   * @type {CommandsManager}
   */
  public manager?: CommandsManager;

  /**
   * Constructor for build a Command
   * @param {ShewenyClient} client Client framework
   * @param {CommandData} data Data for build a Command
   */
  constructor(client: ShewenyClient, data: CommandData) {
    super(client);
    const defaultData = client.managers.commands?.default!;

    this.adminsOnly = data.adminsOnly || defaultData.adminOnly!;
    this.aliases = this.isType(COMMAND_TYPE.cmdMsg) ? (data as MessageData).aliases : [];
    this.args = this.isType(COMMAND_TYPE.cmdMsg) ? (data as MessageData).args : undefined;
    this.category = data.category || defaultData.category!;
    this.channel = data.channel || defaultData.channel;
    this.clientPermissions = data.clientPermissions || defaultData.clientPermissions!;
    this.cooldown = data.cooldown || defaultData.cooldown!;
    this.cooldowns = new Collection();
    this.defaultPermission = this.isType(COMMAND_TYPE.cmdSlash, COMMAND_TYPE.ctxUser, COMMAND_TYPE.ctxMsg)
      ? (data as SlashCommandData | ContextMenuUserData | ContextMenuMessageData).defaultPermission
      : undefined;
    this.description = data.description || '';
    this.examples = data.examples || defaultData.examples;
    this.manager = this.client.managers.commands;
    this.name = data.name;
    this.options = this.isType(COMMAND_TYPE.cmdSlash) ? (data as SlashCommandData).options : undefined;
    this.type = data.type || defaultData.type!;
    this.usage = data.usage || defaultData.usage;
    this.userPermissions = data.userPermissions || defaultData.userPermissions!;
  }

  /**
   * This function is executed before executing the `execute` function
   * @param {CommandInteraction | ContextMenuInteraction | Message} interaction Interaction
   * @returns {any | Promise<any>}
   */
  before?(interaction: CommandInteraction | ContextMenuInteraction | Message): any | Promise<any>;

  onAutocomplete?(interaction: AutocompleteInteraction): any | Promise<any>;

  /**
   * Main function `execute` for the commands
   * @param {CommandInteraction | ContextMenuInteraction | Message} interaction Interaction
   * @param {CommandMessageArgsResolved[]} [args] Arguments of the Message command
   * @returns {any | Promise<any>}
   */
  abstract execute(
    interaction: CommandInteraction | ContextMenuInteraction | Message,
    args?: CommandMessageArgsResolved[]
  ): //args?: CommandMessageArgsResolved
  any | Promise<any>;

  /**
   * Unregister a command from collections
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.commands?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a command
   * @returns {Promise<Collection<string, Command> | null>} The Application Commands collection
   */
  public async reload(): Promise<Collection<string, Command> | null> {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }

  /**
   * Register a command in collections
   * @returns {Collection<string, ApplicationCommand>} The Application Commands collection
   */
  public async register(): Promise<Collection<string, Command>> {
    const Command = (await import(this.path!)).default;
    const AC: Command = new Command(this.client);
    return this.client.collections.commands
      ? this.client.collections.commands.set(AC.name, AC)
      : new Collection<string, Command>().set(AC.name, AC);
  }
  private isType(...types: string[]): boolean {
    if (types.includes(this.type)) return true;
    return false;
  }
}
