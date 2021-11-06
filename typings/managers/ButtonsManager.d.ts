import { Collection } from 'collection-data';
import type { ShewenyClient, Button } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Buttons
 */
export declare class ButtonsManager {
    /**
     * Client framework
     * @type {ShewenyClient}
     */
    private client;
    /**
     * Directory of the buttons folder
     * @type {string}
     */
    directory: string;
    /**
     * Collection of the buttons
     * @type {Collection<string[], Button> | undefined}
     */
    buttons?: Collection<string[], Button>;
    /**
     * Constructor to manage buttons
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the buttons folder
     * @param {boolean} [loadAll] If the buttons are loaded during bot launch
     */
    constructor(client: ShewenyClient, options: BaseManagerOptions);
    /**
     * Load all buttons in collection
     * @returns {Promise<Collection<string[], Button>>}
     */
    loadAll(): Promise<Collection<string[], Button> | undefined>;
}
