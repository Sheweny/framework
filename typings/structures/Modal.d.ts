import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import { ShewenyError } from '../helpers/index.js';
import type { ModalSubmitInteraction } from 'discord.js';
import type { ModalsManager } from '..';
import type { ShewenyClient } from '../client/Client.js';
import type { Awaitable } from '../typescript/utilityTypes';
import { ModalOptions } from '../typescript/interfaces';
/**
 * Represents an Modal structure
 * @extends {BaseStructure}
 */
export declare abstract class Modal extends BaseStructure {
    /**
     * Cooldown of a button in seconds
     * @type {number}
     */
    cooldown: number;
    /**
     * Custom id for one or more modals
     * @type {string[] | RegExp[]}
     */
    customId: string[] | RegExp[];
    /**
     * The
     * @type {ModalsManager}
     */
    manager?: ModalsManager;
    /**
     * Constructor to build a Modal
     * @param {ShewenyClient} client Client framework
     * @param {string[] | RegExp[]} customId Custom id for one or more modals
     */
    constructor(client: ShewenyClient, customId: string[] | RegExp[], options?: ModalOptions);
    /**
     * This function is executed before executing the `execute` function
     * @param {ModalSubmitInteraction} interaction Modal interaction
     * @returns {any | Promise<any>}
     */
    before?(interaction: ModalSubmitInteraction): Awaitable<unknown>;
    /**
     * Main function `execute` for the modals
     * @param {ModalSubmitInteraction} interaction Modal interaction
     * @returns {any | Promise<any>}
     */
    abstract execute(interaction: ModalSubmitInteraction): Awaitable<unknown>;
    /**
     * Register a modal in collections
     * @returns {Collection<string[] | RegExp[], Modal>}
     */
    register(): Promise<Collection<string[] | RegExp[], Modal> | ShewenyError>;
    /**
     * Reload a modal
     * @returns {Promise<Collection<string[] | RegExp[], Modal> | ShewenyError>}
     */
    reload(): Promise<Collection<string[] | RegExp[], Modal> | ShewenyError>;
    /**
     * Unregister a modal from collections
     * @returns {boolean}
     */
    unregister(): boolean;
}
