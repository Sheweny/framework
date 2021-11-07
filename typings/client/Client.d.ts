import { Client } from 'discord.js';
import { DiscordResolve } from '@sheweny/resolve';
import type { Snowflake, ClientOptions } from 'discord.js';
import type { ShewenyClientOptions, Managers, ManagersCollections } from '../typescript/interfaces';
import * as Constants from '../constants/constants';
/**
 * Sheweny framework client
 */
export declare class ShewenyClient extends Client {
    /**
     * The mode of the application (developement or production)
     * @type {string}
     */
    mode?: typeof Constants.ClientMode.prod | typeof Constants.ClientMode.dev;
    /**
     * The ID of the bot admins
     * @type {Snowflake[]}
     */
    admins: Snowflake[];
    /**
     * The manager of handlers
     * @type {Managers}
     */
    managers: Managers;
    /**
     * The collections of handlers
     * @type {Managers}
     */
    collections: ManagersCollections;
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
