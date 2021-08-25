import { Collection } from "collection-data";
import { ShewenyClient } from "../ShewenyClient";
declare type InhibitorType = "MESSAGE_COMMAND" | "APPLICATION_COMMAND" | "BUTTON" | "SELECT_MENU" | "ALL";
interface IInhibitorMeta {
    type?: InhibitorType[];
    priority?: number;
}
/**
 * Represent an inhibitor
 * @class
 * @abstract
 */
export declare abstract class Inhibitor {
    client: ShewenyClient | any;
    path?: string;
    name: string;
    type: InhibitorType[];
    priority: number;
    /**
     * @constructor
     * @param {ShewenyClient} client - The client
     * @param {string[]} customId - The different inhibitor customid
     */
    constructor(client: ShewenyClient, name: string, options?: IInhibitorMeta);
    abstract onFailure(...args: any[]): any | Promise<any>;
    abstract execute(...args: any[]): any | Promise<any>;
    /**
     * Unregister a inhibitor
     * @public
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a inhibitor
     * @public
     * @async
     * @returns {Promise<Collection<string[], Inhibitor> | null>} The inhibitors collection
     */
    reload(): Promise<Collection<string, Inhibitor> | null>;
    /**
     * Register a inhibitor
     * @public
     * @async
     * @returns {Collection<string[], Inhibitor>} The inhibitors collection
     */
    register(): Promise<Collection<string, Inhibitor>>;
}
export {};
