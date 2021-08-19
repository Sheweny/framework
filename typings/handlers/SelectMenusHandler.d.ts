import { Collection } from "collection-data";
import type { ShewenyClient } from "../index";
import { SelectMenu } from "../structures/SelectMenu";
/**
 * Loads select menus.
 * @class
 */
export declare class SelectMenusHandler {
    private client;
    private dir;
    /**
     * @param {ShewenyClient} client - The client
     * @param {string} directory - The directory of the select menus
     */
    constructor(client: ShewenyClient, dir: string);
    /**
     * Register all select menus in collection
     * @returns {Promise<Collection<string[], SelectMenu>>} The select menus collection
     */
    registerAll(): Promise<Collection<string[], SelectMenu>>;
}
