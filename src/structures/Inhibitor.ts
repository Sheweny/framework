import { Collection } from "collection-data";
import { BaseStructure } from ".";
import type { ShewenyClient } from "../client/Client";

type InhibitorType =
  | "MESSAGE_COMMAND"
  | "APPLICATION_COMMAND"
  | "BUTTON"
  | "SELECT_MENU"
  | "ALL";

interface InhibitorOptions {
  type?: InhibitorType[];
  priority?: number;
}

export abstract class Inhibitor extends BaseStructure {
  public name: string;
  public type: InhibitorType[];
  public priority: number;

  constructor(client: ShewenyClient, name: string, options?: InhibitorOptions) {
    super(client);

    this.client = client;
    this.name = name;
    this.type = options?.type || ["MESSAGE_COMMAND"];
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
    this.client.collections.inhibitors?.delete(this.name);
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
    return this.client.collections.inhibitors
      ? this.client.collections.inhibitors.set(inhib.name, inhib)
      : new Collection<string, Inhibitor>().set(inhib.name, inhib);
  }
}
