import { Collection } from 'discord.js';
import { BaseManager } from '.';
import type { ShewenyClient, SelectMenu } from '..';
import type { SelectMenusManagerDefaultOptions, SelectMenusManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Select Menus
 */
export declare class SelectMenusManager extends BaseManager {
    /**
     * Default data for the buttons
     * @type {Collection<string[], Button> | undefined}
     */
    default?: SelectMenusManagerDefaultOptions;
    /**
     * Collection of the select menus
     * @type {Collection<string[], SelectMenu> | undefined}
     */
    selectMenus?: Collection<string[], SelectMenu> | null;
    /**
     * Constructor to manage select menus
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the select menus folder
     * @param {boolean} [loadAll] If the select menus are loaded during bot launch
     */
    constructor(client: ShewenyClient, options: SelectMenusManagerOptions);
    /**
     * Load all select menus in collection
     * @returns {Promise<Collection<string[], SelectMenu>>}
     */
    loadAll(): Promise<Collection<string[], SelectMenu> | undefined>;
    /**
     * Unload all selectMenus
     * @returns {void}
     */
    unloadAll(): void;
}
