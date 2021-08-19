import { Collection } from "collection-data";
import { SlashHandler } from "../index";
import type { Command, ICommandHandlerOptions } from "../typescript/interfaces/interfaces";
import type { ShewenyClient } from "../index";
/**
 * Loads commands.
 * @class
 */
export declare class CommandsHandler {
    private client;
    private dir;
    slashCommands: SlashHandler | undefined;
    options: ICommandHandlerOptions;
    /**
     * @param {ICommandHandlerOptions} options - The options for the commands handler
     * @param {ShewenyClient} [client] - The client
     */
    constructor(options: ICommandHandlerOptions, client?: ShewenyClient);
    /**
     * Load all commands and register them to a collection.
     * @returns {Promise<Collection<string, Command>>} The collection of commands
     */
    loadAll(): Promise<Collection<string, Command>>;
}
