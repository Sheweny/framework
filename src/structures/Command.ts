import type { ApplicationCommandOptionData, ApplicationCommandType } from "discord.js";
import { Collection } from "collection-data";
import type { ShewenyClient } from "..";

export interface ICommandMeta {
  description: string;
  guildOnly?: boolean;
  DMOnly?: boolean;
  type?: ApplicationCommandType;
  aliases?: string[];
  options?: Array<ApplicationCommandOptionData>;
  category: string;
  cooldown?: number;
  userPermissions?: string[];
  botPermissions?: string[];
  subCommands?: any[];
  defaultPermission?: boolean;
}

/**
 * Represent a command
 * @class Command structure
 * @abstract
 */
export abstract class Command {
  public client;
  public path?: string;
  public guildOnly: boolean;
  public DMOnly: boolean;
  public name: string;
  public description: string;
  public aliases?: string[];
  public options?: Array<ApplicationCommandOptionData>;
  public category: string = "Bot";
  public cooldown: number = 0;
  public userPermissions: string[] = [];
  public botPermissions: string[] = [];
  public subCommands: string[] = [];
  public defaultPermission?: boolean;

  /**
   * @constructor
   * @param {ShewenyClient} client - The client
   * @param {string} name - The name of the command
   * @param {ICommandMeta} options - The options of the command
   */
  constructor(client: ShewenyClient, name: string, options: ICommandMeta) {
    this.client = client;
    this.guildOnly = options.guildOnly || false;
    this.DMOnly = options.DMOnly || false;
    this.name = name;
    this.description = options.description;
    if (options.aliases) this.aliases = options.aliases;
    this.options = options.options;
    this.category = options.category;
    if (options.cooldown) this.cooldown = options.cooldown;
    if (options.userPermissions) this.userPermissions = options.userPermissions;
    if (options.botPermissions) this.botPermissions = options.botPermissions;
    if (options.subCommands) this.subCommands = options.subCommands;
    this.defaultPermission = options.defaultPermission;
  }

  /**
   * Unregister a command
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.commands?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a command
   * @public
   * @async
   * @returns {Promise<Collection<string, Command> | null>} The commands collection
   */
  public async reload(): Promise<Collection<string, Command> | null> {
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
   * @returns {Collection<string, Command>} The commands collection
   */
  public async register(): Promise<Collection<string, Command>> {
    const Command = (await import(this.path!)).default;
    const cmd = new Command(this.client);
    return this.client.commands
      ? this.client.commands.set(cmd.name, cmd)
      : new Collection<string, Command>().set(cmd.name, cmd);
  }
}
