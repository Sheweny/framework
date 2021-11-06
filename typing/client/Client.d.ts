import { Client } from "discord.js";
import { DiscordResolve } from "@sheweny/resolve";
import type { Snowflake, ClientOptions } from "discord.js";
import type { ShewenyClientOptions } from "../interfaces/Client";
import type { HandlersManager, HandlersCollections } from "../interfaces/Handlers";
/**
 * Sheweny framework client
 */
export declare class ShewenyClient extends Client {
    /**
     * The mode of the application (developement or production)
     * @type {string}
     */
    mode?: "production" | "development";
    /**
     * The ID of the bot admins
     * @type {Snowflake[]}
     */
    admins: Snowflake[];
    /**
     * The manager of handlers
     * @type {HandlersManager}
     */
    handlers: HandlersManager;
    /**
     * The collections of handlers
     * @type {HandlersManager}
     */
    collections: HandlersCollections;
    /**
     * A util tool to resolve channel, user, etc
     * @type {DiscordResolve}
     */
    util: DiscordResolve;
    /**
     * If the client joins a Thread when created
     * @type {boolean}
     */
    joinThreadsOnCreate: boolean;
    /**
     * Set options and your client is ready
     * @param {ShewenyClientOptions} options Client framework options
     * @param {ClientOptions} [clientOptions] Client discord.js options
     */
    constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions);
    /**
     * Return true when the client is ready
     * @returns {Promise<boolean>}
     */
    awaitReady(): Promise<boolean>;
}
