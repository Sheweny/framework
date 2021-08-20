import { Collection } from "collection-data";
import { Client } from "discord.js";
import { ShewenyClient } from "../ShewenyClient";
import { Event } from "../structures";
/**
 * Loads events.
 * @class Event Handler
 */
export declare class EventsHandler {
    private client;
    private dir;
    /**
     * @constructor
     * @param {string} directory - The directory of the events
     * @param {ShewenyClient | Client} client - The client
     * @param {boolean} [registerAll] - Register all events in collection
     */
    constructor(dir: string, client: ShewenyClient | Client, registerAll?: boolean);
    /**
     * Register all events in collection
     * @public
     * @async
     * @returns {Promise<Collection<string, Event>>} The events collection
     */
    registerAll(): Promise<Collection<string, Event>>;
    /**
     * Load all events and register them in collection if no events are registered
     * @public
     * @async
     * @param {Collection<string, Event>} [events] - The events to load.
     * @returns {Promise<void>}
     */
    loadAll(events?: Collection<string, Event>): Promise<void>;
}
