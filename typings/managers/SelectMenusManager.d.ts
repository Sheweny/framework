import { Collection } from 'discord.js';
import type { ShewenyClient, SelectMenu } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Select Menus
 */
export declare class SelectMenusManager {
    /**
     * Client framework
     * @type {ShewenyClient}
     */
    private client;
    /**
     * Directory of the select menus folder
     * @type {string}
     */
    directory: string;
    /**
     * Collection of the select menus
     * @type {Collection<string[], SelectMenu> | undefined}
     */
    selectMenus?: Collection<string[], SelectMenu>;
    /**
     * Constructor to manage select menus
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the select menus folder
     * @param {boolean} [loadAll] If the select menus are loaded during bot launch
     */
    constructor(client: ShewenyClient, options: BaseManagerOptions);
    /**
     * Load all select menus in collection
     * @returns {Promise<Collection<string[], SelectMenu>>}
     */
    loadAll(): Promise<Collection<string[], SelectMenu> | undefined>;
}
