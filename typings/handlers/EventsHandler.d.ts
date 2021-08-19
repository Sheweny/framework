import { Collection } from "collection-data";
import type { ShewenyClient } from "../index";
import type { Event } from "../typescript/interfaces/interfaces";
/**
 * Loads events.
 * @class
 */
export declare class EventsHandler {
    private client;
    private dir;
    /**
     * @param {string} directory - The directory of the events
     * @param {ShewenyClient} [client] - The client
     */
    constructor(dir: string, client?: ShewenyClient);
    /**
     * Register all events in collection
     * @returns {Promise<Collection<string, Event>>} The events collection
     */
    registerAll(): Promise<Collection<string, Event>>;
    /**
     * Load all events and register them in collection if no events are registered
     * @param {Collection<string, Event>} [events] - The events to load.
     * @returns {Promise<void>}
     */
    loadAll(events?: Collection<string, Event>): Promise<void>;
}
