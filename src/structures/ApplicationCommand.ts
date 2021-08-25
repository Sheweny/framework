import { Collection } from "collection-data";
import {
  ApplicationCommandData,
  CommandInteraction,
  ContextMenuInteraction,
} from "discord.js";
import { ShewenyClient } from "../ShewenyClient";
import { BaseStructure } from ".";

export interface IApplicationCommandOptions {
  description?: string;
  category: string;
  only?: "GUILD" | "DM";
  cooldown?: number;
  userPermissions?: string[];
  clientPermissions?: string[];
}
interface IArgs {
  id: string;
  type: "USER" | "ROLE";
  permission: boolean;
}
/**
 * Represent a Application Command
 * @class Application Command structure
 * @abstract
 */
export abstract class ApplicationCommand extends BaseStructure {
  public data: ApplicationCommandData;
  public description?: string;
  public category: string;
  public only: "GUILD" | "DM";
  public cooldown: number;
  public userPermissions: string[];
  public clientPermissions: string[];
  public cooldowns: Collection<string, Collection<string, number>>;
  /**
   * @constructor
   * @param {ShewenyClient} client - The client
   * @param {ApplicationCommandData} data - Application Command data
   */
  constructor(
    client: ShewenyClient,
    data: ApplicationCommandData,
    options: IApplicationCommandOptions
  ) {
    super(client);
    this.client = client;
    this.data = data;
    this.description = options.description;
    this.category = options.category;
    this.only = options.only || "GUILD";
    this.cooldown = options.cooldown || 0;
    this.userPermissions = options.userPermissions || [];
    this.clientPermissions = options.clientPermissions || [];
    this.cooldowns = new Collection();
  }

  before?(interaction: CommandInteraction | ContextMenuInteraction): any | Promise<any>;

  abstract execute(
    interaction: CommandInteraction | ContextMenuInteraction
  ): any | Promise<any>;

  /**
   * Unregister a application command
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.commands.interaction?.delete(this.data.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a Application Command
   * @public
   * @async
   * @returns {Promise<Collection<string, ApplicationCommand> | null>} The Application Commands collection
   */
  public async reload(): Promise<Collection<string, ApplicationCommand> | null> {
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
  public async register(): Promise<Collection<string, ApplicationCommand>> {
    const ApplicationCommand = (await import(this.path!)).default;
    const AC: ApplicationCommand = new ApplicationCommand(this.client);
    return this.client.commands.interaction
      ? this.client.commands.interaction.set(AC.data.name, AC)
      : new Collection<string, ApplicationCommand>().set(AC.data.name, AC);
  }
}
