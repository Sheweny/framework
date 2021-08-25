/// <reference types="node" />
import { Collection } from "collection-data";
import { IMessageCommandHandlerOptions } from "../typescript/interfaces/interfaces";
import { ShewenyClient } from "../ShewenyClient";
import { MessageCommand } from "../structures";
import { EventEmitter } from "events";
import type { Client } from "discord.js";
/**
 * Loads commands.
 * @class Commands Handler
 */
export declare class MessageCommandsHandler extends EventEmitter {
    private client?;
    private dir;
    options: IMessageCommandHandlerOptions;
    /**
     * @constructor
     * @param {IMessageCommandHandlerOptions} options - The options for the commands handler
     * @param {ShewenyClient} [client] - The client
     */
    constructor(options: IMessageCommandHandlerOptions, client?: ShewenyClient | Client, loadAll?: boolean);
    /**
     * Load all commands and register them to a collection.
     * @public
     * @async
     * @returns {Promise<Collection<string, MessageCommand>>} The collection of commands
     */
    loadAll(): Promise<Collection<string, MessageCommand>>;
}
