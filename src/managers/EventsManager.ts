import { EventEmitter } from 'events';
import { Collection } from 'discord.js';
import { BaseManager } from '.';
import { loadFiles } from '../utils/loadFiles';
import { ShewenyInformation } from '../helpers';
import type { EventsManagerOptions, EventsManagerDefaultOptions } from '../typescript/interfaces';
import type { ShewenyClient, Event } from '..';

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
   * @type {Collection<string, Event> | null}
   */
	public events?: Collection<string, Event> | null;

	/**
   * Constructor to manage events
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the events folder
   * @param {boolean} [loadAll] If the events are loaded during bot launch
   */
	constructor(client: ShewenyClient, options: EventsManagerOptions) {
		super(client, options);

		this.default = {
			emitter: options.default?.emitter || client,
			once: options.default?.once || false,
		};
		if (options?.loadAll) this.loadAndRegisterAll();
	}

	/**
   * Load all events in collection
   * @returns {Promise<Collection<string, Event>>}
   */
	public async loadAll(): Promise<Collection<string, Event> | undefined> {
		const events = await loadFiles<string, Event>(this.client, {
			directory: this.directory,
			key: 'name',
		});
		if (events) this.client.collections.events = events;
		this.events = events;
		new ShewenyInformation(this.client, `- Events loaded : ${this.client.collections.events.size}`);
		return events;
	}

	/**
   * Load all and Register events
   * @returns {Promise<void>}
   */
	public async loadAndRegisterAll(): Promise<void> {
		const events = await this.loadAll();
		await this.registerAll(events);
	}

	/**
   * Emit all events in collection
   * @param {Collection<string, Event> | undefined} [events] Events collection that will be emit
   * @returns {Promise<void>}
   */
	public async registerAll(events: Collection<string, Event> | undefined | null = this.events): Promise<void> {
		if (!events) throw new Error('No events found');

		for (const [name, evt] of events) {
			if (!(evt.emitter instanceof EventEmitter)) throw new TypeError(`Event ${name} does not have a valid emitter.`);
			if (evt.once) evt.emitter.once(name, (...args: any[]) => evt.execute(...args));
			else evt.emitter.on(name, (...args: any[]) => evt.execute(...args));
		}
	}

	/**
   * Unload all events
   * @returns {void}
   */
	public unloadAll(): void {
		this.events = null;
		this.client.collections.events.clear();
	}
}
