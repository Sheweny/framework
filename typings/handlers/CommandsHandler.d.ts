import { Collection } from "collection-data";
import { SlashHandler } from ".";
import type { Command, ICommandHandlerOptions } from "../typescript/interfaces/interfaces";
import type { ShewenyClient } from "..";
/**
 * Loads commands.
 * @class
 */
export declare class CommandsHandler {
    private client?;
    private dir;
    slashCommands?: SlashHandler;
    options: ICommandHandlerOptions;
    /**
     * @param {ICommandHandlerOptions} options - The options for the commands handler
     * @param {ShewenyClient} [client] - The client
     */
    constructor(options: ICommandHandlerOptions, client?: ShewenyClient, registerAll?: boolean);
    /**
     * Load all commands and register them to a collection.
     * @returns {Promise<Collection<string, Command>>} The collection of commands
     */
    registerAll(): Promise<Collection<string, Command>>;
}
