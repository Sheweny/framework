/// <reference types="node" />
import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import { ShewenyError } from '../helpers';
import type { EventEmitter } from 'events';
import type { ShewenyClient } from '../client/Client';
import type { EventOptions } from '../typescript/interfaces';
import type { EventsManager } from '..';
import type { Awaitable } from '../typescript/utilityTypes';
/**
 * Represents an Event structure
 * @extends {BaseStructure}
 */
export declare abstract class Event extends BaseStructure {
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
     * The
     * @type {EventsManager}
     */
    manager?: EventsManager;
    /**
     * Name of a event
     * @type {string}
     */
    name: string;
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
    before?(...args: unknown[]): Awaitable<unknown>;
    /**
     * Execute the events
     * @param {any} args
     */
    abstract execute(...args: unknown[]): Awaitable<unknown>;
    /**
     * Register an event
     * @public
     * @async
     * @returns {Promise<Collection<string, Event>>} The events collection
     */
    register(): Promise<Collection<string, Event> | ShewenyError>;
    /**
     * Reload an event
     * @public
     * @async
     * @returns {Promise<Collection<string, Event> | ShewenyError>} The events collection
     */
    reload(): Promise<Collection<string, Event> | ShewenyError>;
    /**
     * Unregister an event
     * @public
     * @returns {boolean}
     */
    unregister(): boolean;
}
