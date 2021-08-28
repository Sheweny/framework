import { Collection } from "collection-data";
import { BaseStructure } from ".";
import type { ShewenyClient } from "../client/Client";
import type {
  CommandData,
  MessageCommandOptionData,
  MessageCommandArgs,
  CommandType,
} from "../interfaces/Command";
import type {
  ApplicationCommandOptionData,
  CommandInteraction,
  ContextMenuInteraction,
  Message,
  PermissionString,
} from "discord.js";

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
   * Only channel where a command can be executed
   * @type {"GUILD" | "DM" | undefined}
   */
  public channel?: "GUILD" | "DM";

  /**
   * Cooldown of a command
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
   * Constructor for build a Command
   * @param {ShewenyClient} client Client framework
   * @param {CommandData} data Data for build a Command
   */
  constructor(client: ShewenyClient, data: CommandData) {
    super(client);

    this.name = data.name;
    this.description = data.description || "";
    this.type = data.type;
    this.defaultPermission =
      data.type !== "MESSAGE_COMMAND" ? data.defaultPermission : undefined;
    this.options = data.type === "SLASH_COMMAND" ? data.options : undefined;
    this.args = data.type === "MESSAGE_COMMAND" ? data.args : undefined;
    this.category = data.category || "";
    this.channel = data.channel;
    this.cooldown = data.cooldown || 0;
    this.adminsOnly = data.adminsOnly || false;
    this.userPermissions = data.userPermissions || [];
    this.clientPermissions = data.clientPermissions || [];
    this.aliases = data.type === "MESSAGE_COMMAND" ? data.aliases : [];
    this.cooldowns = new Collection();
  }

  /**
   * This function is executed before executing the `execute` function
   * @param {CommandInteraction | ContextMenuInteraction | Message} interaction Interaction
   * @param {MessageCommandArgs[]} [args] Arguments of the Message command
   * @returns {any | Promise<any>}
   */
  before?(
    interaction: CommandInteraction | ContextMenuInteraction | Message,
    args?: MessageCommandArgs[]
  ): any | Promise<any>;

  /**
   * Main function `execute` for the commands
   * @param {CommandInteraction | ContextMenuInteraction | Message} interaction Interaction
   * @param {MessageCommandArgs[]} [args] Arguments of the Message command
   * @returns {any | Promise<any>}
   */
  abstract execute(
    interaction: CommandInteraction | ContextMenuInteraction | Message,
    args?: MessageCommandArgs[]
  ): //args?: MessageCommandArgs
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
}
