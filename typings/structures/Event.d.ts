import { Collection } from "collection-data";
import type { ShewenyClient } from "../index";
interface IEventMeta {
    name: string;
    description: string;
    once: boolean;
}
/**
 * Represent a event
 * @class
 */
export declare class Event {
    protected client: any;
    protected path?: string;
    protected name: string;
    protected description: string;
    protected once: boolean;
    /**
     * @param {ShewenyClient} client - The client
     * @param {string} name - The name of the event
     * @param {IEventMeta} options - The options of the event
     */
    constructor(client: ShewenyClient, name: string, options: IEventMeta);
    /**
     * Unregister a event
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a event
     * @returns {Promise<Collection<string, Event> | null>} The events collection
     */
    reload(): Promise<Collection<string, Event> | null>;
    /**
     * Register a event
     * @returns {Promise<Collection<string, Event>>} The events collection
     */
    register(): Promise<Collection<string, Event>>;
}
export {};
