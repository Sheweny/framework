import type { ShewenyClient } from "../index";
import { Button } from "../structures/Button";
import { Collection } from "collection-data";
/**
 * Loads buttons.
 * @class
 */
export declare class ButtonsHandler {
    private client;
    private dir;
    /**
     * @param {ShewenyClient} client - The client
     * @param {string} directory - The directory of the buttons
     */
    constructor(client: ShewenyClient, dir: string);
    /**
     * Register all buttons in collection
     * @returns {Promise<Collection<string[], Event>>} The buttons collection
     */
    registerAll(): Promise<Collection<string[], Button>>;
}
