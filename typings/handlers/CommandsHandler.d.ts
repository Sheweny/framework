import { SlashHandler } from "../index";
import type { ICommandHandlerOptions } from "../typescript/interfaces/CommandHandler";
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
     * @returns {Collection<string, Command>} The collection of commands
     */
    loadAll(): Promise<import("collection-data").Collection<string, import("../typescript/interfaces/Command").Command>>;
    /**
     * Read dir and return array with all paths of files
     * @param {string} directory - The directory to read
     * @returns {Array<string>}
     */
    _readDirAndPush(d: string): Promise<Array<string>>;
}
