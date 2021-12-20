import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import type { ButtonInteraction } from 'discord.js';
import type { ButtonsManager } from '..';
import type { ShewenyClient } from '../client/Client';
/**
 * Represents an Button structure
 * @extends {BaseStructure}
 */
export declare abstract class Button extends BaseStructure {
    /**
     * Custom id for one or more buttons
     * @type {string[] | RegExp[]}
     */
    customId: string[] | RegExp[];
    /**
     * The
     * @type {ButtonsManager}
     */
    manager?: ButtonsManager;
    /**
     * Constructor for build a Button
     * @param {ShewenyClient} client Client framework
     * @param {string[] | RegExp[]} customId Custom id for one or more buttons
     */
    constructor(client: ShewenyClient, customId: string[] | RegExp[]);
    /**
     * This function is executed before executing the `execute` function
     * @param {ButtonInteraction} interaction Button interaction
     * @returns {any | Promise<any>}
     */
    before?(interaction: ButtonInteraction): any | Promise<any>;
    /**
     * Main function `execute` for the buttons
     * @param {ButtonInteraction} interaction Button interaction
     * @returns {any | Promise<any>}
     */
    abstract execute(interaction: ButtonInteraction): any | Promise<any>;
    /**
     * Unregister a button from collections
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a button
     * @returns {Promise<Collection<string[] | RegExp[], Button> | null>}
     */
    reload(): Promise<Collection<string[] | RegExp[], Button> | null>;
    /**
     * Register a button in collections
     * @returns {Collection<string[] | RegExp[], Button>}
     */
    register(): Promise<Collection<string[] | RegExp[], Button>>;
}
