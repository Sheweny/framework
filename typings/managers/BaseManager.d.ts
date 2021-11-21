/// <reference types="node" />
import { EventEmitter } from 'events';
import { ShewenyClient } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';
export declare class BaseManager extends EventEmitter {
    /**
     * Client framework
     * @type {ShewenyClient}
     */
    client: ShewenyClient;
    /**
     * Directory to load
     * @type {string}
     */
    directory: string;
    /**
     * Constructor of BaseManager class (extends EventEmitter)
     * @param {ShewenyClient} client
     * @param {BaseManagerOptions} options
     */
    constructor(client: ShewenyClient, options: BaseManagerOptions);
}
