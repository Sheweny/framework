import { Collection } from 'collection-data';
import { loadFiles } from '../utils/loadFiles';
import type { ShewenyClient, Event } from '..';
import EventEmitter = require('events');

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
   * @type {Collection<string, Event> | undefined}
   */
  public events?: Collection<string, Event>;

  /**
   * Constructor to manage events
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the events folder
   * @param {boolean} [loadAll] If the events are loaded during bot launch
   */
  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError('Client must be provided.');
    if (!directory) throw new TypeError('Directory must be provided.');

    this.client = client;
    this.directory = directory;

    if (loadAll) this.loadAndRegisterAll();
    client.managers.events = this;
  }

  /**
   * Load all events in collection
   * @returns {Promise<Collection<string, Event>>}
   */
  public async loadAll(): Promise<Collection<string, Event> | undefined> {
    const events = await loadFiles<string, Event>(this.client, this.directory, 'name');
    this.client.collections.events = events;
    this.events = events;
    return events;
  }

  /**
   * Emit all events in collection
   * @param {Collection<string, Event> | undefined} [events] Events collection that will be emit
   * @returns {Promise<void>}
   */
  public async registerAll(events: Collection<string, Event> | undefined = this.events): Promise<void> {
    if (!events) throw new Error('No events found');

    for (const [name, evt] of events) {
      if (!(evt.emitter instanceof EventEmitter)) throw new TypeError(`Event ${name} does not have a valid emitter.`);
      if (evt.once) evt.emitter.once(name, (...args: any[]) => evt.execute(...args));
      else evt.emitter.on(name, (...args: any[]) => evt.execute(...args));
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
