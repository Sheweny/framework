import { Client, ClientOptions } from "discord.js";
import { Collection } from "collection-data";
import { MessageCommandsHandler, ApplicationCommandHandler, EventsHandler, ButtonsHandler, SelectMenusHandler, InhibitorsHandler } from "./handlers";
import type { IMessageCommandHandlerOptions } from "./typescript/interfaces/interfaces";
import { ApplicationCommand, MessageCommand, Button, Event, Inhibitor, SelectMenu } from "./structures";
interface IClientHandlers {
    messageCommands?: MessageCommandsHandler;
    applicationCommands?: ApplicationCommandHandler;
    events?: EventsHandler;
    buttons?: ButtonsHandler;
    selectMenus?: SelectMenusHandler;
    contextMenus?: null;
    inhibitors?: InhibitorsHandler;
}
interface IOptionsHandlers {
    messageCommands?: IMessageCommandHandlerOptions;
    applicationCommands?: {
        directory: string;
    };
    events?: {
        directory: string;
    };
    buttons?: {
        directory: string;
    };
    selectMenus?: {
        directory: string;
    };
    inhibitors?: {
        directory: string;
    };
}
interface IShewenyClientOptions extends ClientOptions {
    handlers?: IOptionsHandlers;
    admins?: string[];
}
/**
 * The main hub for interacting with the Discord API, and the starting point for any bot.
 * @class ShewenyClient
 * @extends Client Discord.js Client
 */
export declare class ShewenyClient extends Client {
    shewenyOptions: IShewenyClientOptions;
    admins?: string[];
    handlers: IClientHandlers;
    messageCommands?: Collection<string, MessageCommand>;
    applicationCommands?: Collection<string, ApplicationCommand>;
    events?: Collection<string, Event>;
    buttons?: Collection<string[], Button>;
    selectMenus?: Collection<string[], SelectMenu>;
    inhibitors?: Collection<string, Inhibitor>;
    commandsType?: "MESSAGE_COMMANDS" | "APPLICATION_COMMANDS";
    cooldowns: Collection<string, Collection<string, number>>;
    /**
     * @constructor Constructor of ShewenyClient
     * @param {IShewenyClientOptions} options - The options for the client
     */
    constructor(options: IShewenyClientOptions);
    /**
     * Init ShewenyClient
     * @async
     * @private
     * @returns {Promise<void>}
     */
    private init;
    /**
     * Resolve when client is ready
     * @public
     * @returns {Promise<void>}
     */
    awaitReady(): Promise<void>;
}
export {};
