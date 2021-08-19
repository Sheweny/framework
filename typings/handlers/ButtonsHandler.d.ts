import type { ShewenyClient } from "../index";
import { Button } from "../typescript/interfaces/interfaces";
import { Collection } from "collection-data";
/**
 * Loads buttons.
 * @class
 */
export declare class ButtonsHandler {
    private client;
    private dir;
    /**
     * @param {string} directory - The directory of the buttons
     * @param {ShewenyClient} [client] - The client
     */
    constructor(dir: string, client?: ShewenyClient);
    /**
     * Register all buttons in collection
     * @returns {Promise<Collection<string[], Event>>} The buttons collection
     */
    registerAll(): Promise<Collection<string[], Button>>;
}
