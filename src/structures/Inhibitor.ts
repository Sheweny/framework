import { Collection } from "collection-data";
import type { ShewenyClient } from "..";

interface IInhibitorMeta {
  type: string;
  priority?: number;
}

/**
 * Represent an hinibitor
 * @class
 */
export abstract class Inhibitor {
  public client;
  public path?: string;
  public name: string;
  public type: string;
  public priority: number;

  /**
   * @param {ShewenyClient} client - The client
   * @param {string[]} customId - The different buttons customid
   */
  constructor(client: ShewenyClient, name: string, options: IInhibitorMeta) {
    this.client = client;
    this.name = name;
    this.type = options.type || "COMMAND";
    this.priority = options.priority || 0;
  }

  /**
   * Unregister a button
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.inhibitors?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a inhibitor
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
   * @returns {Collection<string[], Inhibitor>} The inhibitors collection
   */
  public async register(): Promise<Collection<string, Inhibitor>> {
    const Inhibitor = (await import(this.path!)).default;
    const inhib = new Inhibitor(this.client);
    return this.client.inhibitors
      ? this.client.inhibitors.set(inhib.name, inhib)
      : new Collection<string, Inhibitor>().set(inhib.name, inhib);
  }
}
