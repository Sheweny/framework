import { Collection } from "collection-data";
import type { ShewenyClient } from "..";
import { Inhibitor } from "../typescript/interfaces/interfaces";
/**
 * Loads inhibitors.
 * @class
 */
export declare class InhibitorsHandler {
    private client;
    private dir;
    /**
     * @param {string} directory - The directory of the inhibitors
     * @param {ShewenyClient} [client] - The client
     */
    constructor(dir: string, client?: ShewenyClient, registerAll?: boolean);
    /**
     * Register all inhibitors in collection
     * @returns {Promise<Collection<string, Event>>} The inhibitors collection
     */
    registerAll(): Promise<Collection<string, Inhibitor>>;
}
