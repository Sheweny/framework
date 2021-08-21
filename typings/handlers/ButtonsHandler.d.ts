import { Collection } from "collection-data";
import { ShewenyClient } from "../ShewenyClient";
import { Button } from "../structures";
import type { Client } from "discord.js";
/**
 * Loads buttons.
 * @class Buttons Handler
 */
export declare class ButtonsHandler {
    private client?;
    private dir;
    /**
     * @constructor
     * @param {string} directory - The directory of the buttons
     * @param {ShewenyClient} [client] - The client
     */
    constructor(dir: string, client?: ShewenyClient | Client, loadAll?: boolean);
    /**
     * Register all buttons in collection
     * @public
     * @async
     * @returns {Promise<Collection<string[], Event>>} The buttons collection
     */
    loadAll(): Promise<Collection<string[], Button>>;
}
