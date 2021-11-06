/// <reference types="node" />
import { Collection } from 'collection-data';
import { BaseStructure } from '.';
import type { ShewenyClient } from '../client/Client';
import type { EventOptions } from '../typescript/interfaces';
import type { EventEmitter } from 'events';
/**
 * Represents an Event structure
 * @extends {BaseStructure}
 */
export declare abstract class Event extends BaseStructure {
    /**
     * Name of a event
     * @type {string}
     */
    name: string;
    /**
     * Description of a event
     * @type {string}
     */
    description: string;
    /**
     * Set the emitter of the event
     * @type {Emitter}
     */
    emitter: EventEmitter;
    /**
     * If the listener is deleted after it is executed
     * @type {boolean}
     */
    once: boolean;
    /**
     * Constructor for build a Event
     * @param {ShewenyClient} client Client framework
     * @param {string} name Name of the event
     * @param {string[]} customId Custom id for one or more buttons
     */
    constructor(client: ShewenyClient, name: string, options?: EventOptions);
    before?(...args: any[]): any | Promise<any>;
    abstract execute(...args: any[]): any | Promise<any>;
    /**
     * Unregister an event
     * @public
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload an event
     * @public
     * @async
     * @returns {Promise<Collection<string, Event> | null>} The events collection
     */
    reload(): Promise<Collection<string, Event> | null>;
    /**
     * Register an event
     * @public
     * @async
     * @returns {Promise<Collection<string, Event>>} The events collection
     */
    register(): Promise<Collection<string, Event>>;
}
