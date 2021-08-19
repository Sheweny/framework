import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import type { ShewenyClient } from "..";
import type { Event } from "../typescript/interfaces/interfaces";

/**
 * Loads events.
 * @class
 */
export class EventsHandler {
  private client: ShewenyClient | undefined;
  private dir: string;

  /**
   * @param {string} directory - The directory of the events
   * @param {ShewenyClient} [client] - The client
   */
  constructor(dir: string, client?: ShewenyClient) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
  }

  /**
   * Register all events in collection
   * @returns {Promise<Collection<string, Event>>} The events collection
   */
  public async registerAll(): Promise<Collection<string, Event>> {
    const events: Collection<string, Event> = new Collection();
    const baseDir = join(require.main!.path, this.dir);
    const evtsPaths: string[] = await readDirAndPush(baseDir);
    for (const evtPath of evtsPaths) {
      const Event = (await import(evtPath)).default;
      if (!Event) continue;
      const instance = new Event(this.client);
      if (!instance.name) continue;
      instance.path = evtPath;
      events.set(instance.name, instance);
    }
    if (this.client) this.client.events = events;
    return events;
  }

  /**
   * Load all events and register them in collection if no events are registered
   * @param {Collection<string, Event>} [events] - The events to load.
   * @returns {Promise<void>}
   */
  public async loadAll(events?: Collection<string, Event>): Promise<void> {
    if (!this.client)
      throw new Error("Client must be provided in constructor for loading events.");
    let evts: Collection<string, Event> | undefined =
      events || this.client.events || (await this.registerAll());
    if (!evts) throw new Error("No events found");
    for (const [name, evt] of evts) {
      this.client.on(name, (...args: any[]) => evt.execute(args));
    }
  }
}
