import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import { ShewenyError } from '../helpers';
import type { InhibitorsManager } from '..';
import type { ShewenyClient } from '../client/Client';
import type { InhibitorType } from '../typescript/types';
import type { Interaction, Message } from 'discord.js';
import type { Awaitable } from '../typescript/utilityTypes';
interface InhibitorOptions {
    type?: InhibitorType[];
    priority?: number;
}
/**
 * Represents an Command structure
 * @extends {BaseStructure}
 */
export declare abstract class Inhibitor extends BaseStructure {
    /**
     * The
     * @type {InhibitorsManager}
     */
    manager?: InhibitorsManager;
    /**
     * Name of a inhibitor
     * @type {string}
     */
    name: string;
    /**
     * Priority of a inhibitor
     * @type {number}
     */
    priority: number;
    /**
     * Type(s) of a inhibitor
     * @type {InhibitorType[]}
     */
    type: InhibitorType[];
    /**
     * Constructor for build a Inhibitor
     * @param {ShewenyClient} client Client framework
     * @param {string} name Name of the event
     * @param {InhibitorOptions} [options] Options for the inhibitor
     */
    constructor(client: ShewenyClient, name: string, options?: InhibitorOptions);
    /**
     * Main function `execute` for the inhibitors
     * @param {any[]} args Button interaction
     * @returns: Awaitable<unknown>}
     */
    abstract execute(client: ShewenyClient, ctx: Interaction | Message): Awaitable<unknown>;
    /**
     * This function is executed when the main `execute` function has failed
     * @param {any[]} args Arguments
     * @returns: Awaitable<unknown>}
     */
    abstract onFailure(client: ShewenyClient, ctx: Interaction | Message): Awaitable<unknown>;
    /**
     * Register a inhibitor in collections
     * @returns {Collection<string[], Inhibitor>} The inhibitors collection
     */
    register(): Promise<Collection<string, Inhibitor> | ShewenyError>;
    /**
     * Reload a inhibitor
     * @returns {Promise<Collection<string[], Inhibitor> | ShewenyError>} The inhibitors collection
     */
    reload(): Promise<Collection<string, Inhibitor> | ShewenyError>;
    /**
     * Unregister a inhibitor from collections
     * @returns {boolean}
     */
    unregister(): boolean;
}
export {};
