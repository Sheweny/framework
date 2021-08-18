import { Client } from "discord.js";
import type { Command } from "./typescript/interfaces/Command";
import type { Event } from "./typescript/interfaces/Event";
import { Button } from "./typescript/interfaces/Button";
import type { IShewenyClientOptions, IClientHandlers } from "./typescript/interfaces/ShewenyClient";
import { Collection } from "collection-data";
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
