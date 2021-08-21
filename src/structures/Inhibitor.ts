import { Collection } from "collection-data";
import { ShewenyClient } from "../ShewenyClient";

interface IInhibitorMeta {
  type?: "MESSAGE_COMMAND" | "APPLICATION_COMMAND" | "BUTTON" | "SELECT_MENU";
  priority?: number;
}

/**
 * Represent an inhibitor
 * @class
 * @abstract
 */
export abstract class Inhibitor {
  public client;
  public path?: string;
  public name: string;
  public type:
    | "MESSAGE_COMMAND"
    | "APPLICATION_COMMAND"
    | "BUTTON"
    | "SELECT_MENU"
    | "ALL" = "MESSAGE_COMMAND";
  public priority: number = 0;

  /**
   * @constructor
   * @param {ShewenyClient} client - The client
   * @param {string[]} customId - The different inhibitor customid
   */
  constructor(client: ShewenyClient, name: string, options?: IInhibitorMeta) {
    this.client = client;
    this.name = name;
    this.type = options?.type || "MESSAGE_COMMAND";
    this.priority = options?.priority || 0;
  }

  abstract onFailure(...args: any[]): any | Promise<any>;

  abstract execute(...args: any[]): any | Promise<any>;

  /**
   * Unregister a inhibitor
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.inhibitors?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a inhibitor
   * @public
   * @async
   * @returns {Promise<Collection<string[], Inhibitor> | null>} The inhibitors collection
   */
  public async reload(): Promise<Collection<string, Inhibitor> | null> {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }

  /**
   * Register a inhibitor
   * @public
   * @async
   * @returns {Collection<string[], Inhibitor>} The inhibitors collection
   */
  public async register(): Promise<Collection<string, Inhibitor>> {
    const Inhibitor = (await import(this.path!)).default;
    const inhib: Inhibitor = new Inhibitor(this.client);
    return this.client.inhibitors
      ? this.client.inhibitors.set(inhib.name, inhib)
      : new Collection<string, Inhibitor>().set(inhib.name, inhib);
  }
}
