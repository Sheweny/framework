import { Client, ClientOptions } from "discord.js";
import { Collection } from "collection-data";
import { CommandsHandler, EventsHandler, ButtonsHandler, SelectMenusHandler } from ".";
import type { Command, Event, Button, ICommandHandlerOptions, SelectMenu } from "./typescript/interfaces/interfaces";
interface IClientHandlers {
    commands?: CommandsHandler;
    events?: EventsHandler;
    buttons?: ButtonsHandler;
    selectMenus?: SelectMenusHandler;
}
interface IOptionsHandlers {
    commands?: ICommandHandlerOptions;
    events?: {
        directory: string;
    };
    buttons?: {
        directory: string;
    };
    selectMenus?: {
        directory: string;
    };
}
interface IShewenyClientOptions extends ClientOptions {
    handlers?: IOptionsHandlers;
    admins?: string[];
}
/**
 * The main hub for interacting with the Discord API, and the starting point for any bot.
 * @class
 */
export declare class ShewenyClient extends Client {
    shewenyOptions: IShewenyClientOptions;
    admins?: string[];
    handlers: IClientHandlers;
    commands: Collection<string, Command>;
    events: Collection<string, Event>;
    buttons: Collection<string[], Button>;
    selectMenus: Collection<string[], SelectMenu>;
    commandsType?: string;
    cooldowns: Collection<string, Collection<string, number>>;
    /**
     * @param {Object} options - The options for the client
     */
    constructor(options: IShewenyClientOptions);
    /**
     * @param {string} [dir=./events] - The directory of framework events
     * @returns {Promise<void>}
     */
    init(dir?: string): Promise<void>;
    /**
     * Resolve when client is ready
     * @returns {Promise<void>}
     */
    awaitReady(): Promise<void>;
}
export {};
