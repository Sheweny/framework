import type { ShewenyClient } from "../index";
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
     * @returns {Collection<string, Event>}
     */
    registerAll(): Promise<import("collection-data").Collection<string, import("../typescript/interfaces/interfaces").Event>>;
    /**
     * Load all events and register them in collection if no events are registered
     * @returns {Collection<string, Event>}
     */
    loadAll(): Promise<void>;
    /**
     * Read dir and return array with all paths of files
     * @param {string} directory - The directory to read
     * @returns {Array<string>}
     */
    _readDirAndPush(d: string): Promise<Array<string>>;
}
