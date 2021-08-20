import { Collection } from "collection-data";
import { ApplicationCommandData, CommandInteraction } from "discord.js";
import { ShewenyClient } from "../ShewenyClient";

export interface IApplicationCommandMeta {
  category: string;
  only?: "GUILD" | "DM";
  cooldown?: number;
  userPermissions?: string[];
  botPermissions?: string[];
}

/**
 * Represent a Application Command
 * @class Application Command structure
 * @abstract
 */
export abstract class ApplicationCommand {
  public client;
  public path?: string;
  public data: ApplicationCommandData;
  public category: string;
  public only: "GUILD" | "DM";
  public cooldown: number;
  public userPermissions: string[];
  public botPermissions: string[];

  /**
   * @constructor
   * @param {ShewenyClient} client - The client
   * @param {ApplicationCommandData} data - Application Command data
   */
  constructor(
    client: ShewenyClient,
    data: ApplicationCommandData,
    options: IApplicationCommandMeta
  ) {
    this.client = client;
    this.data = data;
    this.category = options.category;
    this.only = options.only || "GUILD";
    this.cooldown = options.cooldown || 0;
    this.userPermissions = options.userPermissions || [];
    this.botPermissions = options.botPermissions || [];
  }

  before?(interaction: CommandInteraction): any | Promise<any>;

  abstract execute(interaction: CommandInteraction): any | Promise<any>;

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
