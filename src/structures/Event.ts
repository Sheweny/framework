import { Collection } from "collection-data";
import { BaseStructure } from ".";
import type { ClientEvents } from "discord.js";
import type { ShewenyClient } from "../client/Client";

interface EventOptions {
  description?: string;
  once?: boolean;
}

export abstract class Event extends BaseStructure {
  public name: keyof ClientEvents;
  public description: string;
  public once: boolean;

  constructor(
    client: ShewenyClient,
    name: keyof ClientEvents,
    options?: EventOptions
  ) {
    super(client);

    this.client = client;
    this.name = name;
    this.description = options?.description || "";
    this.once = options?.once || false;
  }

  before?(...args: any[]): any | Promise<any>;

  abstract execute(...args: any[]): any | Promise<any>;

  /**
   * Unregister a event
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.events?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a event
   * @public
   * @async
   * @returns {Promise<Collection<string, Event> | null>} The events collection
   */
  public async reload(): Promise<Collection<string, Event> | null> {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }

  /**
   * Register a event
   * @public
   * @async
   * @returns {Promise<Collection<string, Event>>} The events collection
   */
  public async register(): Promise<Collection<string, Event>> {
    const event = (await import(this.path!)).default;
    const evt: Event = new event(this.client);
    return this.client.collections.events
      ? this.client.collections.events.set(evt.name, evt)
      : new Collection<string, Event>().set(evt.name, evt);
  }
}
