import { join } from "path";
import { Collection } from "collection-data";
import { Client } from "discord.js";
import { readDirAndPush } from "../util/readDirFiles";
import { ShewenyClient } from "../ShewenyClient";
import { Event } from "../structures";

/**
 * Loads events.
 * @class Event Handler
 */
export class EventsHandler {
  private client: ShewenyClient | Client;
  private dir: string;

  /**
   * @constructor
   * @param {string} directory - The directory of the events
   * @param {ShewenyClient | Client} client - The client
   * @param {boolean} [loadAll] - Register all events in collection
   */
  constructor(dir: string, client: ShewenyClient | Client, loadAll?: boolean) {
    if (!dir) throw new TypeError("Directory must be provided.");
    if (!client) throw new TypeError("Client muste be provided.");
    this.client = client;
    this.dir = dir;
    if (loadAll) this.loadAll();
    if (client && client instanceof ShewenyClient) client.handlers.events = this;
  }

  /**
   * Register all events in collection
   * @public
   * @async
   * @returns {Promise<Collection<string, Event>>} The events collection
   */
  public async loadAll(): Promise<Collection<string, Event>> {
    const events: Collection<string, Event> = new Collection();
    const baseDir = join(require.main!.path, this.dir);
    const evtsPaths: string[] = await readDirAndPush(baseDir);
    for (const evtPath of evtsPaths) {
      const Event = (await import(evtPath)).default;
      if (!Event) continue;
      const instance: Event = new Event(this.client);
      if (!instance.name) continue;
      instance.path = evtPath;
      events.set(instance.name, instance);
    }
    if (this.client instanceof ShewenyClient) this.client.events = events;
    return events;
  }

  /**
   * Load all events and register them in collection if no events are registered
   * @public
   * @async
   * @param {Collection<string, Event>} [events] - The events to load.
   * @returns {Promise<void>}
   */
  public async registerAll(events?: Collection<string, Event>): Promise<void> {
    let evts =
      events || (this.client instanceof ShewenyClient ? this.client.events : undefined);
    if (!evts) throw new Error("No events found");
    const client = this.client instanceof ShewenyClient ? this.client : this.client;
    for (const [name, evt] of evts) {
      client.on(name, (...args: any[]) => evt.execute(args));
    }
  }
}
