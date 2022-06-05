import { Client } from 'discord.js';
import { ClientUtil } from './ClientUtil';
import { CLIENT_MODE } from '../constants/constants.js';
import type { Snowflake, ClientOptions } from 'discord.js';
import type { ShewenyClientOptions, Managers, ManagersCollections, Cooldowns } from '../typescript/interfaces';
/**
 * Sheweny framework client
 */
export declare class ShewenyClient extends Client {
    /**
     * The ID of the bot admins
     * @type {Snowflake[]}
     */
    admins: Snowflake[];
    /**
     * The collections of handlers
     * @type {ManagersCollections}
     */
    collections: ManagersCollections;
    /**
     * If the client is ready
     * @type {boolean}
     */
    cooldowns: Cooldowns;
    /**
     * If the client is ready
     * @type {boolean}
     */
    connected: boolean;
    /**
     * If the cooldown should be desactivated for admins
     * @type {boolean}
     */
    disableCooldownsForAdmins: boolean;
    /**
     * If the client joins a Thread when created
     * @type {boolean}
     */
    joinThreadsOnCreate: boolean;
    /**
     * The mode of the application (developement or production)
     * @type {string}
     */
    mode?: typeof CLIENT_MODE.prod | typeof CLIENT_MODE.dev;
    /**
     * The manager of handlers
     * @type {Managers}
     */
    managers: Managers;
    /**
     * A util tool to resolve channel, user, get data etc
     * @type {ClientUtil}
     */
    util: ClientUtil;
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
