import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import type { InhibitorsManager } from '..';
import type { ShewenyClient } from '../client/Client';
import type { InhibitorType } from '../typescript/types';
import type { Interaction, Message } from 'discord.js';
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
     * This function is executed when the main `execute` function has failed
     * @param {any[]} args Arguments
     * @returns {any | Promise<any>}
     */
    abstract onFailure(client: ShewenyClient, ctx: Interaction | Message): any | Promise<any>;
    /**
     * Main function `execute` for the inhibitors
     * @param {any[]} args Button interaction
     * @returns {any | Promise<any>}
     */
    abstract execute(client: ShewenyClient, ctx: Interaction | Message): any | Promise<any>;
    /**
     * Unregister a inhibitor from collections
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a inhibitor
     * @returns {Promise<Collection<string[], Inhibitor> | null>} The inhibitors collection
     */
    reload(): Promise<Collection<string, Inhibitor> | null>;
    /**
     * Register a inhibitor in collections
     * @returns {Collection<string[], Inhibitor>} The inhibitors collection
     */
    register(): Promise<Collection<string, Inhibitor>>;
}
export {};
