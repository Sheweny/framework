import { Collection } from "collection-data";
import type { ShewenyClient, Inhibitor } from "..";
/**
 * Manager for Inhibitors
 */
export declare class InhibitorsManager {
    /**
     * Client framework
     * @type {ShewenyClient}
     */
    private client;
    /**
     * Directory of the inhibitors folder
     * @type {string}
     */
    directory: string;
    /**
     * Collection of the inhibitors
     * @type {Collection<string, Inhibitor> | undefined}
     */
    inhibitors?: Collection<string, Inhibitor>;
    /**
     * Constructor to manage inhibitors
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the inhibitors folder
     * @param {boolean} [loadAll] If the inhibitors are loaded during bot launch
     */
    constructor(client: ShewenyClient, directory: string, loadAll?: boolean);
    /**
     * Load all inhibitors in collection
     * @returns {Promise<Collection<string, Inhibitor>>}
     */
    loadAll(): Promise<Collection<string, Inhibitor> | undefined>;
}
