import { Collection } from 'discord.js';
import { BaseStructure, ShewenyError } from '../index';
import type { EventEmitter } from 'events';
import type { ShewenyClient, EventsManager } from '../index';
import type { EventOptions, Awaitable } from '../typescript';

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
   * The
   * @type {EventsManager}
   */
  public manager?: EventsManager;

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
    this.manager = this.client.managers.events;
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
   * @returns {Promise<Collection<string, Event>>} The events collection
   */
  public async register(): Promise<Collection<string, Event> | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Event', this.name);
    const EventImported = (await import(this.path)).default;
    const evt: Event = new EventImported(this.client);
    return this.client.collections.events
      ? this.client.collections.events.set(evt.name, evt)
      : new Collection<string, Event>().set(evt.name, evt);
  }

  /**
   * Reload an event
   * @public
   * @async
   * @returns {Promise<Collection<string, Event> | ShewenyError>} The events collection
   */
  public async reload(): Promise<Collection<string, Event> | ShewenyError> {
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
