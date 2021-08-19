import type { ShewenyClient } from "../index";
import { Event } from "../structures/Event";
import { Collection } from "collection-data";
/**
 * Loads events.
 * @class
 */
export declare class EventsHandler {
    private client;
    private dir;
    /**
     * @param {ShewenyClient} client - The client
     * @param {string} directory - The directory of the events
     */
    constructor(client: ShewenyClient, dir: string);
    /**
     * Register all events in collection
     * @returns {Promise<Collection<string, Event>>} The events collection
     */
    registerAll(): Promise<Collection<string, Event>>;
    /**
     * Load all events and register them in collection if no events are registered
     * @returns {Promise<void>}
     */
    loadAll(): Promise<void>;
}
