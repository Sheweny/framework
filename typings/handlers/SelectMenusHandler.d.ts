import { Collection } from "collection-data";
import type { ShewenyClient } from "..";
import { SelectMenu } from "../typescript/interfaces/interfaces";
/**
 * Loads select menus.
 * @class
 */
export declare class SelectMenusHandler {
    private client;
    private dir;
    /**
     * @param {string} directory - The directory of the select menus
     * @param {ShewenyClient} [client] - The client
     */
    constructor(dir: string, client?: ShewenyClient);
    /**
     * Register all select menus in collection
     * @returns {Promise<Collection<string[], SelectMenu>>} The select menus collection
     */
    registerAll(): Promise<Collection<string[], SelectMenu>>;
}
