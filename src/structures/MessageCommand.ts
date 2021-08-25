import { Collection } from "collection-data";
import { BaseStructure } from ".";
import type { ShewenyClient } from "../ShewenyClient";
import type { Message } from "discord.js";

export interface IMessageCommandMeta {
  description?: string;
  category: string;
  only?: "GUILD" | "DM";
  aliases?: string[];
  cooldown?: number;
  userPermissions?: string[];
  clientPermissions?: string[];
}

/**
 * Represent a command
 * @class Command structure
 * @abstract
 */
export abstract class MessageCommand extends BaseStructure {
  public only: "GUILD" | "DM";
  public name: string;
  public description?: string;
  public aliases: string[];
  public category: string;
  public cooldown: number;
  public userPermissions: string[];
  public clientPermissions: string[];
  public cooldowns: Collection<string, Collection<string, number>>;

  /**
   * @constructor
   * @param {ShewenyClient} client - The client
   * @param {string} name - The name of the command
   * @param {ICommandMeta} options - The options of the command
   */
  constructor(client: ShewenyClient, name: string, options: IMessageCommandMeta) {
    super(client);
    this.name = name;
    this.description = options.description;
    this.category = options.category;
    this.only = options.only || "GUILD";
    this.aliases = options.aliases || [];
    this.cooldown = options.cooldown || 0;
    this.userPermissions = options.userPermissions || [];
    this.clientPermissions = options.clientPermissions || [];
    this.cooldowns = new Collection();
  }

  before?(message: Message, args: string[]): any | Promise<any>;

  abstract execute(message: Message, args: string[]): any | Promise<any>;

  /**
   * Unregister a command
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.commands.message?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a command
   * @public
   * @async
   * @returns {Promise<Collection<string, MessageCommand> | null>} The commands collection
   */
  public async reload(): Promise<Collection<string, MessageCommand> | null> {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }

  /**
   * Register a command
   * @public
   * @async
   * @returns {Collection<string, MessageCommand>} The commands collection
   */
  public async register(): Promise<Collection<string, MessageCommand>> {
    const Command = (await import(this.path!)).default;
    const cmd: MessageCommand = new Command(this.client);
    return this.client.commands.message
      ? this.client.commands.message.set(cmd.name, cmd)
      : new Collection<string, MessageCommand>().set(cmd.name, cmd);
  }
}
