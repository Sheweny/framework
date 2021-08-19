import { Collection } from "collection-data";
import { SlashHandler } from "../index";
import { Command } from "../structures/Command";
import type { ICommandHandlerOptions } from "../typescript/interfaces/interfaces";
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
     * @param {ShewenyClient} client - The client
     * @param {ICommandHandlerOptions} options - The options for the commands handler
     */
    constructor(client: ShewenyClient, options: ICommandHandlerOptions);
    /**
     * @returns {Promise<Collection<string, Command>>} The collection of commands
     */
    loadAll(): Promise<Collection<string, Command>>;
}
