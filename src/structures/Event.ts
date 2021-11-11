import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import type { EventEmitter } from 'events';
import type { ShewenyClient } from '../client/Client';
import type { EventOptions } from '../typescript/interfaces';
import type { EventsManager } from '..';
/**
 * Represents an Event structure
 * @extends {BaseStructure}
 */
export abstract class Event extends BaseStructure {
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

    this.client = client;
    this.name = name;
    this.description = options?.description || '';
    this.emitter = options?.emitter || this.client;
    this.once = options?.once || false;
  }

  before?(...args: any[]): any | Promise<any>;

  abstract execute(...args: any[]): any | Promise<any>;

  /**
   * Unregister an event
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.events?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload an event
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
   * Register an event
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
