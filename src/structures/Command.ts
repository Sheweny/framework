import { Collection } from "collection-data";
import { BaseStructure } from ".";
import type { ShewenyClient } from "../client/Client";
import type {
  CommandData,
  MessageCommandOptionData,
  MessageCommandArgs,
} from "../interfaces/Command";
import type {
  ApplicationCommandOptionData,
  CommandInteraction,
  ContextMenuInteraction,
  Message,
  PermissionString,
} from "discord.js";

export abstract class Command extends BaseStructure {
  public name: string;
  public description?: string;
  public type:
    | "SLASH_COMMAND"
    | "CONTEXT_MENU_MESSAGE"
    | "CONTEXT_MENU_USER"
    | "MESSAGE_COMMAND";
  public defaultPermission?: boolean;
  public options?: ApplicationCommandOptionData[];
  public args?: MessageCommandOptionData[];
  public category: string;
  public channel?: "GUILD" | "DM";
  public cooldown: number;
  public adminsOnly: boolean;
  public userPermissions: PermissionString[];
  public clientPermissions: PermissionString[];
  public aliases?: string[];
  public cooldowns: Collection<string, Collection<string, number>>;

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

  before?(
    interaction: CommandInteraction | ContextMenuInteraction | Message,
    args?: MessageCommandArgs[]
  ): any | Promise<any>;

  abstract execute(
    interaction: CommandInteraction | ContextMenuInteraction | Message,
    args?: MessageCommandArgs[]
  ): //args?: MessageCommandArgs
  any | Promise<any>;

  /**
   * Unregister a application command
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.commands?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a Application Command
   * @public
   * @async
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
   * Register a Application Command
   * @public
   * @async
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
