import { Collection } from 'discord.js';
import { BaseManager } from '.';
import type { ShewenyClient, Button } from '..';
import type { ButtonsManagerDefaultOptions, ButtonsManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Buttons
 */
export declare class ButtonsManager extends BaseManager {
    /**
     * Collection of the buttons
     * @type {Collection<string[], Button> | undefined}
     */
    buttons?: Collection<string[], Button> | null;
    /**
     * Default data for the buttons
     * @type {Collection<string[], Button> | undefined}
     */
    default?: ButtonsManagerDefaultOptions;
    /**
     * Constructor to manage buttons
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the buttons folder
     * @param {boolean} [loadAll] If the buttons are loaded during bot launch
     */
    constructor(client: ShewenyClient, options: ButtonsManagerOptions);
    /**
     * Load all buttons in collection
     * @returns {Promise<Collection<string[], Button>>}
     */
    loadAll(): Promise<Collection<string[], Button> | undefined>;
    /**
     * Unload all buttons
     * @returns {void}
     */
    unloadAll(): void;
}
