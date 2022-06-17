import { Collection } from 'discord.js';
import { BaseManager } from '.';
import type { ShewenyClient, Inhibitor } from '..';
import type { InhibitorsManagerOptions, InhibitorsManagerDefaultOptions } from '../typescript/interfaces';
/**
 * Manager for Inhibitors
 */
export declare class InhibitorsManager extends BaseManager {
    /**
     * Default data for the inhibitors
     * @type {InhibitorsManagerDefaultOptions}
     */
    default: InhibitorsManagerDefaultOptions;
    /**
     * Collection of the inhibitors
     * @type {Collection<string, Inhibitor> | undefined}
     */
    inhibitors?: Collection<string, Inhibitor> | null;
    /**
     * Constructor to manage inhibitors
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the inhibitors folder
     * @param {boolean} [loadAll] If the inhibitors are loaded during bot launch
     */
    constructor(client: ShewenyClient, options: InhibitorsManagerOptions);
    /**
     * Load all inhibitors in collection
     * @returns {Promise<Collection<string, Inhibitor>>}
     */
    loadAll(): Promise<Collection<string, Inhibitor> | undefined>;
    /**
     * Unload all inhibitors
     * @returns {void}
     */
    unloadAll(): void;
}
