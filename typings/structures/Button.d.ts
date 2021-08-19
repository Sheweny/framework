import { Collection } from "collection-data";
import type { ShewenyClient } from "..";
/**
 * Represent a button
 * @class
 */
export declare abstract class Button {
    client: any;
    path?: string;
    customId: string[];
    /**
     * @param {ShewenyClient} client - The client
     * @param {string[]} customId - The different buttons customid
     */
    constructor(client: ShewenyClient, customId: string[]);
    /**
     * Unregister a button
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a button
     * @returns {Promise<Collection<string[], Button> | null>} The buttons collection
     */
    reload(): Promise<Collection<string[], Button> | null>;
    /**
     * Register a button
     * @returns {Collection<string[], Button>} The buttons collection
     */
    register(): Promise<Collection<string[], Button>>;
}
