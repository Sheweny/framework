import { Collection } from "collection-data";
import { ShewenyClient } from "../ShewenyClient";
interface IEventMeta {
    description?: string;
    once?: boolean;
}
/**
 * Represent a event
 * @class Event structure
 * @abstract
 */
export declare abstract class Event {
    client: ShewenyClient | any;
    path?: string;
    name: string;
    description: string;
    once: boolean;
    /**
     * @constructor
     * @param {ShewenyClient} client - The client
     * @param {string} name - The name of the event
     * @param {IEventMeta} options - The options of the event
     */
    constructor(client: ShewenyClient, name: string, options?: IEventMeta);
    before?(...args: any[]): any | Promise<any>;
    abstract execute(...args: any[]): any | Promise<any>;
    /**
     * Unregister a event
     * @public
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a event
     * @public
     * @async
     * @returns {Promise<Collection<string, Event> | null>} The events collection
     */
    reload(): Promise<Collection<string, Event> | null>;
    /**
     * Register a event
     * @public
     * @async
     * @returns {Promise<Collection<string, Event>>} The events collection
     */
    register(): Promise<Collection<string, Event>>;
}
export {};
