import { Collection } from "collection-data";
import { join } from "path";
import { readDirAndPush } from "../utils/readDirFiles";
import type { ShewenyClient, Event } from "..";
import type { ClientEvents } from "discord.js";

/**
 * Manager for Events
 */
export class EventsManager {
  /**
   * Client framework
   * @type {ShewenyClient}
   */
  private client: ShewenyClient;

  /**
   * Directory of the events folder
   * @type {string}
   */
  public directory: string;

  /**
   * Collection of the events
   * @type {Collection<keyof ClientEvents, Event> | undefined}
   */
  public events?: Collection<keyof ClientEvents, Event>;

  /**
   * Constructor to manage events
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the events folder
   * @param {boolean} [loadAll] If the events are loaded during bot launch
   */
  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;

    if (loadAll) this.loadAndRegisterAll();
    client.handlers.events = this;
  }

  /**
   * Load all events in collection
   * @returns {Promise<Collection<keyof ClientEvents, Event>>}
   */
  public async loadAll(): Promise<Collection<keyof ClientEvents, Event>> {
    const events: Collection<keyof ClientEvents, Event> = new Collection();
    const baseDir = join(require.main!.path, this.directory);
    const evtsPaths = await readDirAndPush(baseDir);

    for (const evtPath of evtsPaths) {
      const evtImport = await import(evtPath);
      const key = Object.keys(evtImport)[0];
      const Event = evtImport[key];
      if (!Event) continue;
      const instance: Event = new Event(this.client);
      if (!instance.name) continue;
      instance.path = evtPath;
      events.set(instance.name, instance);
    }

    this.client.collections.events = events;
    this.events = events;
    return events;
  }

  /**
   * Emit all events in collection
   * @param {Collection<keyof ClientEvents, Event> | undefined} [events] Events collection that will be emit
   * @returns {Promise<void>}
   */
  public async registerAll(
    events: Collection<keyof ClientEvents, Event> | undefined = this.events
  ): Promise<void> {
    if (!events) throw new Error("No events found");

    for (const [name, evt] of events) {
      if (evt.once) this.client.once(name, (...args: any[]) => evt.execute(...args));
      else this.client.on(name, (...args: any[]) => evt.execute(...args));
    }
  }

  /**
   * Load all and Register events
   * @returns {Promise<void>}
   */
  public async loadAndRegisterAll(): Promise<void> {
    const events = await this.loadAll();
    await this.registerAll(events);
  }
}
