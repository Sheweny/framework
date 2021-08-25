import { Collection } from "collection-data";
import { ShewenyClient } from "../ShewenyClient";

interface IEventMeta {
  description?: string;
  once?: boolean;
}

/**
 * Represent a event
 * @class Event structure
 * @abstract
 */
export abstract class Event {
  public client: ShewenyClient | any;
  public path?: string;
  public name: string;
  public description: string = "";
  public once: boolean = false;

  /**
   * @constructor
   * @param {ShewenyClient} client - The client
   * @param {string} name - The name of the event
   * @param {IEventMeta} options - The options of the event
   */
  constructor(client: ShewenyClient, name: string, options?: IEventMeta) {
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
    this.client.events?.delete(this.name);
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
    return this.client.events
      ? this.client.events.set(evt.name, evt)
      : new Collection<string, Event>().set(evt.name, evt);
  }
}
