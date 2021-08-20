import { Collection } from "collection-data";
import { ShewenyClient } from "../ShewenyClient";
import { Inhibitor } from "../structures";
/**
 * Loads inhibitors.
 * @class
 */
export declare class InhibitorsHandler {
    private client?;
    private dir;
    /**
     * @constructor
     * @param {string} dir - The directory of the inhibitors
     * @param {ShewenyClient} [client] - The client
     * @param {boolean} [registerAll] - Register all inhibitors in collection
     */
    constructor(dir: string, client?: ShewenyClient, registerAll?: boolean);
    /**
     * Register all inhibitors in collection
     * @public
     * @async
     * @returns {Promise<Collection<string, Inhibitor>>} The inhibitors collection
     */
    registerAll(): Promise<Collection<string, Inhibitor>>;
}
