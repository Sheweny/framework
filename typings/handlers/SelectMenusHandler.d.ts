import { Collection } from "collection-data";
import { ShewenyClient } from "../ShewenyClient";
import { SelectMenu } from "../structures";
import type { Client } from "discord.js";
/**
 * Loads select menus.
 * @class Select Menu Handler
 */
export declare class SelectMenusHandler {
    private client?;
    private dir;
    /**
     * @constructor
     * @param {string} directory - The directory of the select menus
     * @param {ShewenyClient} [client] - The client
     */
    constructor(dir: string, client?: ShewenyClient | Client, loadAll?: boolean);
    /**
     * Register all select menus in collection
     * @public
     * @async
     * @returns {Promise<Collection<string[], SelectMenu>>} The select menus collection
     */
    loadAll(): Promise<Collection<string[], SelectMenu>>;
}
