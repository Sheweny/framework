import { BaseStructure } from './index.js';
import { ShewenyError } from '../helpers/index.js';
import type { EventEmitter } from 'events';
import type { ShewenyClient } from '../client/Client.js';
import type { EventOptions, Awaitable } from '../typescript/index.js';

/**
 * Represents an Event structure
 * @extends {BaseStructure}
 */
export abstract class Event extends BaseStructure {
  /**
   * Description of a event
   * @type {string}
   */
  public description: string;

  /**
   * Set the emitter of the event
   * @type {Emitter}
   */
  public emitter: EventEmitter;

  /**
   * Name of a event
   * @type {string}
   */
  public name: string;

  /**
   * If the listener is deleted after it is executed
   * @type {boolean}
   */
  public once: boolean;

  /**
   * Constructor for build a Event
   * @param {ShewenyClient} client Client framework
   * @param {string} name Name of the event
   * @param {string[]} customId Custom id for one or more buttons
   */
  constructor(client: ShewenyClient, name: string, options?: EventOptions) {
    super(client);
    const defaultData = client.managers.events?.default || {};

    this.description = options?.description || '';
    this.emitter = (options?.emitter || defaultData.emitter) ?? this.client;
    this.name = name;
    this.once = (options?.once || defaultData.once) ?? false;
  }

  before?(...args: unknown[]): Awaitable<unknown>;

  /**
   * Execute the events
   * @param {any} args
   */
  abstract execute(...args: unknown[]): Awaitable<unknown>;

  /**
   * Register an event
   * @public
   * @async
   * @returns {Promise<Event | ShewenyError>} The loaded event
   */
  public async register(): Promise<Event | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Event', this.name);
    const EventImported = (await import(this.path)).default;
    const evt: Event = new EventImported(this.client);
    return evt;
  }

  /**
   * Reload an event
   * @public
   * @async
   * @returns {Promise<Collection<string, Event> | ShewenyError>} The events collection
   */
  public async reload(): Promise<Event | ShewenyError> {
    this.unregister();
    return this.register();
  }

  /**
   * Unregister an event
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.events?.delete(this.name);
    if (!this.path) return false;
    delete require.cache[require.resolve(this.path)];
    return true;
  }
}
