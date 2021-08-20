import { Collection } from "collection-data";
import type { ShewenyClient } from "..";
import { Button } from "../typescript/interfaces/interfaces";
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
    constructor(dir: string, client?: ShewenyClient, registerAll?: boolean);
    /**
     * Register all buttons in collection
     * @returns {Promise<Collection<string[], Event>>} The buttons collection
     */
    registerAll(): Promise<Collection<string[], Button>>;
}
