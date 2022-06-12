import { EventEmitter } from 'node:events';
import { Loader } from '../utils/Loader.js';
import { ShewenyInformation } from '../helpers/index.js';
import { BaseManager } from './index.js';
import { Event } from '../structures/index.js';
import { Collection } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { EventsManagerOptions, EventsManagerDefaultOptions } from '../typescript/index.js';

/**
 * Manager for Events
 */
export class EventsManager extends BaseManager {
  /**
   * Default data for the events
   * @type {EventsManagerDefaultOptions}
   */
  public default: EventsManagerDefaultOptions;

  /**
   * Collection of the events
   * @type {Collection<string, Event[]> | undefined}
   */
  public events?: Collection<string, Event[]>;

  /**
   * Constructor to manage events
   * @param {ShewenyClient} [client] Client framework
   * @param {EventsManagerOptions} [options] The options of the event manager
   */
  constructor(client: ShewenyClient, options: EventsManagerOptions) {
    super(client, options);

    this.default = {
      emitter: options.default?.emitter,
      once: options.default?.once,
    };
  }

  /**
   * Load all events in collection
   * @returns {Promise<Collection<string, Event[]> | undefined>} The events to load
   */
  public async loadAll(): Promise<Collection<string, Event[]> | undefined> {
    const loader = new Loader<'name', string, Event>(this.client, this.directory, 'name', {
      manager: this,
      instance: Event,
    });
    this.events = await loader.load();
    new ShewenyInformation(this.client, `- Events loaded : ${this.events.size}`);
    // Register
    await this.registerAll(this.events);
    return this.events;
  }

  /**
   * Emit all events in collection
   * @param {Collection<string, Event[]> | undefined} [events] Events collection that will be emit
   * @returns {Promise<void>}
   */
  public async registerAll(events: Collection<string, Event[]>): Promise<void> {
    if (!events) throw new Error('No events found');

    for (const [name, evts] of events) {
      if (evts && evts.length) {
        for (const evt of evts) {
          if (!(evt.emitter instanceof EventEmitter)) throw new TypeError(`Event ${name} does not have a valid emitter.`);
          if (evt.once) evt.emitter.once(name, (...args: unknown[]) => evt.execute(...args));
          else evt.emitter.on(name, (...args: unknown[]) => evt.execute(...args));
        }
      }
    }
  }

  /**
   * Unload all events
   * @returns {void}
   */
  public unloadAll(): void {
    this.events = new Collection();
    this.client.collections.events.clear();
  }
}
