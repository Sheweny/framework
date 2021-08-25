import { Client, ClientOptions } from "discord.js";
import { Collection } from "collection-data";
import { MessageCommandsHandler, ApplicationCommandsHandler, EventsHandler, ButtonsHandler, SelectMenusHandler, InhibitorsHandler } from "./handlers";
import type { IMessageCommandHandlerOptions } from "./typescript/interfaces/interfaces";
import { ApplicationCommand, MessageCommand, Button, Event, Inhibitor, SelectMenu } from "./structures";
interface IClientHandlersOptions {
    messageCommands?: MessageCommandsHandler;
    applicationCommands?: ApplicationCommandsHandler;
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
        guildId?: string;
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
interface ICommandsManager {
    interaction?: Collection<string, ApplicationCommand>;
    message?: Collection<string, MessageCommand>;
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
    handlers: IClientHandlersOptions;
    commands: ICommandsManager;
    events?: Collection<string, Event>;
    buttons?: Collection<string[], Button>;
    selectMenus?: Collection<string[], SelectMenu>;
    inhibitors?: Collection<string, Inhibitor>;
    /**
     * @constructor Constructor of ShewenyClient
     * @param {IShewenyClientOptions} options - The options for the client
     */
    constructor(options: IShewenyClientOptions, clientOptions?: ClientOptions);
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
