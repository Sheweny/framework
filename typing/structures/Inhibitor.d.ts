import { Collection } from "collection-data";
import { BaseStructure } from ".";
import type { ShewenyClient } from "../client/Client";
declare type InhibitorType = "MESSAGE_COMMAND" | "APPLICATION_COMMAND" | "BUTTON" | "SELECT_MENU" | "ALL";
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
     * Name of a inhibitor
     * @type {string}
     */
    name: string;
    /**
     * Type(s) of a inhibitor
     * @type {InhibitorType[]}
     */
    type: InhibitorType[];
    /**
     * Priority of a inhibitor
     * @type {number}
     */
    priority: number;
    /**
     * Constructor for build a Inhibitor
     * @param {ShewenyClient} client Client framework
     * @param {string} name Name of the event
     * @param {InhibitorOptions} [options] Options for the inhibitor
     */
    constructor(client: ShewenyClient, name: string, options?: InhibitorOptions);
    /**
     * This function is executed when the main `execute` function has failed
     * @param {any[]} args Arguments (???)
     * @returns {any | Promise<any>}
     */
    abstract onFailure(...args: any[]): any | Promise<any>;
    /**
     * Main function `execute` for the inhibitors
     * @param {any[]} args Button interaction
     * @returns {any | Promise<any>}
     */
    abstract execute(...args: any[]): any | Promise<any>;
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
