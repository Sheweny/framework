import { IEventMeta } from "../typescript/interfaces/Event";
import type { ShewenyClient } from "../index";
/**
 * Represent a event
 * @class
 */
export declare class Event {
    protected client: any;
    protected path: string | undefined;
    protected name: string;
    protected description: string;
    protected once: boolean;
    /**
     * @param {ShewenyClient} client - The client
     * @param {string} name - The name of the event
     * @param {Object} options - The options of the event
     */
    constructor(client: ShewenyClient, name: string, options: IEventMeta);
    /**
     * Unregister a event
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a event
     * @returns {boolean|null}
     */
    reload(): Promise<any>;
    /**
     * Register a event
     * @returns {Collection} The events collection
     */
    register(): Promise<any>;
}
