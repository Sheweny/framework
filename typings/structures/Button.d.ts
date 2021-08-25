import { Collection } from "collection-data";
import { ButtonInteraction } from "discord.js";
import { ShewenyClient } from "../ShewenyClient";
/**
 * Represent a button
 * @class Button structure
 * @abstract
 */
export declare abstract class Button {
    client: ShewenyClient | any;
    path?: string;
    customId: string[];
    /**
     * @constructor
     * @param {ShewenyClient} client - The client
     * @param {string[]} customId - The different buttons customid
     */
    constructor(client: ShewenyClient, customId: string[]);
    before?(interaction: ButtonInteraction): any | Promise<any>;
    abstract execute(interaction: ButtonInteraction): any | Promise<any>;
    /**
     * Unregister a button
     * @public
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a button
     * @public
     * @async
     * @returns {Promise<Collection<string[], Button> | null>} The buttons collection
     */
    reload(): Promise<Collection<string[], Button> | null>;
    /**
     * Register a button
     * @public
     * @async
     * @returns {Collection<string[], Button>} The buttons collection
     */
    register(): Promise<Collection<string[], Button>>;
}
