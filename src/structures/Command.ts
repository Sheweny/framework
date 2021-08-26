import type {
  ApplicationCommandOptionData,
  CommandInteraction,
  ContextMenuInteraction,
  Message,
  PermissionString,
} from "discord.js";
import type { ShewenyClient } from "../client/Client";
import type { CommandData } from "../interfaces/Command";
import { Collection } from "collection-data";

export abstract class Command {
  public client: ShewenyClient;
  public path: string = "";
  public name: string;
  public type:
    | "SLASH_COMMAND"
    | "CONTEXT_MENU_MESSAGE"
    | "CONTEXT_MENU_USER"
    | "MESSAGE";
  public defaultPermission?: boolean;
  public options?: ApplicationCommandOptionData[];
  public description?: string;
  public category?: string;
  public channel?: "GUILD" | "DM";
  public cooldown?: null;
  public adminsOnly?: boolean;
  public userPermissions?: PermissionString[];
  public clientPermissions?: PermissionString[];

  constructor(client: ShewenyClient, data: CommandData) {
    this.client = client;
    this.name = data.name;
    this.type = data.type;
    this.defaultPermission =
      data.type !== "MESSAGE" ? data.defaultPermission : undefined;
    this.options = data.type === "SLASH_COMMAND" ? data.options : undefined;
    this.description = data.description || "";
    this.category = data.category;
    this.channel = data.channel;
    this.cooldown = data.cooldown;
    this.adminsOnly = data.adminsOnly;
    this.userPermissions = data.userPermissions;
    this.clientPermissions = data.clientPermissions;
  }

  before?(
    interaction: CommandInteraction | ContextMenuInteraction | Message
  ): any | Promise<any>;

  abstract execute(
    interaction: CommandInteraction | ContextMenuInteraction | Message
  ): any | Promise<any>;

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
