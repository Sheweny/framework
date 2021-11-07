import { Collection } from 'collection-data';
import type { ShewenyClient, Event } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Events
 */
export declare class EventsManager {
    /**
     * Client framework
     * @type {ShewenyClient}
     */
    private client;
    /**
     * Directory of the events folder
     * @type {string}
     */
    directory: string;
    /**
     * Collection of the events
     * @type {Collection<string, Event> | undefined}
     */
    events?: Collection<string, Event>;
    /**
     * Constructor to manage events
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the events folder
     * @param {boolean} [loadAll] If the events are loaded during bot launch
     */
    constructor(client: ShewenyClient, options: BaseManagerOptions);
    /**
     * Load all events in collection
     * @returns {Promise<Collection<string, Event>>}
     */
    loadAll(): Promise<Collection<string, Event> | undefined>;
    /**
     * Emit all events in collection
     * @param {Collection<string, Event> | undefined} [events] Events collection that will be emit
     * @returns {Promise<void>}
     */
    registerAll(events?: Collection<string, Event> | undefined): Promise<void>;
    /**
     * Load all and Register events
     * @returns {Promise<void>}
     */
    loadAndRegisterAll(): Promise<void>;
}
