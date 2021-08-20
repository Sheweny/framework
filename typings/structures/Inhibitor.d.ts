import { Collection } from "collection-data";
import type { ShewenyClient } from "..";
interface IInhibitorMeta {
    type: string;
    priority?: number;
}
/**
 * Represent an hinibitor
 * @class
 */
export declare abstract class Inhibitor {
    client: any;
    path?: string;
    name: string;
    type: string;
    priority: number;
    /**
     * @param {ShewenyClient} client - The client
     * @param {string[]} customId - The different buttons customid
     */
    constructor(client: ShewenyClient, name: string, options: IInhibitorMeta);
    /**
     * Unregister a button
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a inhibitor
     * @returns {Promise<Collection<string[], Inhibitor> | null>} The inhibitors collection
     */
    reload(): Promise<Collection<string, Inhibitor> | null>;
    /**
     * Register a inhibitor
     * @returns {Collection<string[], Inhibitor>} The inhibitors collection
     */
    register(): Promise<Collection<string, Inhibitor>>;
}
export {};
