import { Client } from 'discord.js';
import { Collection } from "collection-data";
import { CommandsHandler, EventsHandler, ButtonsHandler } from './index';
import type { ClientOptions } from 'discord.js';
import type { Command, Event, Button, ICommandHandlerOptions } from './typescript/interfaces/interfaces';
interface IClientHandlers {
    commands?: CommandsHandler;
    events?: EventsHandler;
    buttons?: ButtonsHandler;
}
interface IOptionsHandlers {
    commands?: ICommandHandlerOptions;
    events?: {
        directory: string;
    };
    buttons?: {
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
    commandsType?: string;
    cooldowns: Collection<string, Collection<string, number>>;
    /**
     * @param {Object} options - The options for the client
     */
    constructor(options: IShewenyClientOptions);
    /**
     * @param {string} [dir=./events] - The directory of framework events
     * @returns {undefined}
     */
    init(dir?: string): Promise<void>;
    /**
     * Resolve when client is ready
     * @returns {Promise<undefined>}
     */
    awaitReady(): Promise<void>;
}
export {};
