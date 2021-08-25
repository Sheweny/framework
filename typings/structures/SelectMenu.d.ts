import { Collection } from "collection-data";
import { SelectMenuInteraction } from "discord.js";
import type { ShewenyClient } from "../ShewenyClient";
/**
 * Represent a select menu
 * @class SelectMenu structure
 * @abstract
 */
export declare abstract class SelectMenu {
    client: ShewenyClient | any;
    path?: string;
    customId: string[];
    /**
     * @constructor
     * @param {ShewenyClient} client - The client
     * @param {string[]} customId - The different select menu customid
     */
    constructor(client: ShewenyClient, customId: string[]);
    before?(interaction: SelectMenuInteraction): any | Promise<any>;
    abstract execute(interaction: SelectMenuInteraction): any | Promise<any>;
    /**
     * Unregister a select menu
     * @public
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a select menu
     * @public
     * @async
     * @returns {Promise<Collection<string[], SelectMenu> | null>} The select menus collection
     */
    reload(): Promise<Collection<string[], SelectMenu> | null>;
    /**
     * Register a select menu
     * @public
     * @async
     * @returns {Collection<string[], SelectMenu>} The select menus collection
     */
    register(): Promise<Collection<string[], SelectMenu>>;
}
