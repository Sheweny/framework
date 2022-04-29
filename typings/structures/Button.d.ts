import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import { ShewenyError } from '../helpers';
import type { ButtonInteraction } from 'discord.js';
import type { ButtonsManager } from '..';
import type { ShewenyClient } from '../client/Client';
import type { Awaitable } from '../typescript/utilityTypes';
import { ButtonOptions } from '../typescript/interfaces';
/**
 * Represents an Button structure
 * @extends {BaseStructure}
 */
export declare abstract class Button extends BaseStructure {
    /**
     * Cooldown of a button in seconds
     * @type {number}
     */
    cooldown: number;
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
    constructor(client: ShewenyClient, customId: string[] | RegExp[], options?: ButtonOptions);
    /**
     * This function is executed before executing the `execute` function
     * @param {ButtonInteraction} interaction Button interaction
     * @returns {any | Promise<any>}
     */
    before?(interaction: ButtonInteraction): Awaitable<unknown>;
    /**
     * Main function `execute` for the buttons
     * @param {ButtonInteraction} interaction Button interaction
     * @returns {any | Promise<any>}
     */
    abstract execute(interaction: ButtonInteraction): Awaitable<unknown>;
    /**
     * Register a button in collections
     * @returns {Collection<string[] | RegExp[], Button>}
     */
    register(): Promise<Collection<string[] | RegExp[], Button> | ShewenyError>;
    /**
     * Reload a button
     * @returns {Promise<Collection<string[] | RegExp[], Button> | ShewenyError>}
     */
    reload(): Promise<Collection<string[] | RegExp[], Button> | ShewenyError>;
    /**
     * Unregister a button from collections
     * @returns {boolean}
     */
    unregister(): boolean;
}
