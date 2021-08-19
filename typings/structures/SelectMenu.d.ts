import { Collection } from "collection-data";
import type { ShewenyClient } from "..";
/**
 * Represent a select menu
 * @class
 */
export declare class SelectMenu {
    client: any;
    path?: string;
    customId: string[];
    /**
     * @param {ShewenyClient} client - The client
     * @param {string[]} customId - The different select menu customid
     */
    constructor(client: ShewenyClient, customId: string[]);
    /**
     * Unregister a select menu
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a select menu
     * @returns {Promise<Collection<string[], SelectMenu> | null>} The select menus collection
     */
    reload(): Promise<Collection<string[], SelectMenu> | null>;
    /**
     * Register a select menu
     * @returns {Collection<string[], SelectMenu>} The select menus collection
     */
    register(): Promise<Collection<string[], SelectMenu>>;
}
