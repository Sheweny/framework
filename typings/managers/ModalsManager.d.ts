import { Collection } from 'discord.js';
import { BaseManager } from '.';
import type { ShewenyClient, Modal } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Modals
 */
export declare class ModalsManager extends BaseManager {
    /**
     * Collection of modals
     * @type {Collection<string[], Modal> | undefined}
     */
    modals?: Collection<string[], Modal> | null;
    /**
     * Constructor to manage modals
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the modals folder
     * @param {boolean} [loadAll] If the modals are loaded during bot launch
     */
    constructor(client: ShewenyClient, options: BaseManagerOptions);
    /**
     * Load all modals in collection
     * @returns {Promise<Collection<string[], Modal>>}
     */
    loadAll(): Promise<Collection<string[], Modal> | undefined>;
    /**
     * Unload all modals
     * @returns {void}
     */
    unloadAll(): void;
}
