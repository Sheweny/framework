import { Collection } from 'collection-data';
import { BaseStructure } from '.';
import * as Constants from '../constants/constants';
import type { ShewenyClient } from '../client/Client';
import type { MessageCommandOptionData, CommandMessageArgsResolved } from '../typescript/interfaces';
import type { CommandData, CommandType } from '../typescript/types';
import type { ApplicationCommandOptionData, CommandInteraction, ContextMenuInteraction, Message, PermissionString } from 'discord.js';
/**
 * Represents an Command structure
 * @extends {BaseStructure}
 */
export declare abstract class Command extends BaseStructure {
    /**
     * Name of a command
     * @type {string}
     */
    name: string;
    /**
     * Description of a command
     * @type {string | undefined}
     */
    description?: string;
    /**
     * Type of a command
     * @type {CommandType}
     */
    type: CommandType;
    /**
     * Default permission of a Application command
     * @type {boolean | undefined}
     */
    defaultPermission?: boolean;
    /**
     * Options of a Application command
     * @type {ApplicationCommandOptionData[] | undefined}
     */
    options?: ApplicationCommandOptionData[];
    /**
     * Args of a Message command
     * @type {MessageCommandOptionData | undefined}
     */
    args?: MessageCommandOptionData[];
    /**
     * Category of a command
     * @type {string}
     */
    category: string;
    /**
     * Only channel where a command can be executed
     * @type {"GUILD" | "DM" | undefined}
     */
    channel?: typeof Constants.CommandChannel.guild | typeof Constants.CommandChannel.dm;
    /**
     * Cooldown of a command
     * @type {number}
     */
    cooldown: number;
    /**
     * If a command is reserved for bot admins
     * @type {boolean}
     */
    adminsOnly: boolean;
    /**
     * The permissions required to be executed by the user
     * @type {PermissionString[]}
     */
    userPermissions: PermissionString[];
    /**
     * The permissions required for the client
     * @type {PermissionString[]}
     */
    clientPermissions: PermissionString[];
    /**
     * Aliases of the Message command
     * @type {string[] | undefined}
     */
    aliases?: string[];
    /**
     * Cooldowns collection
     * @type {Collection<string, Collection<string, number>>}
     */
    cooldowns: Collection<string, Collection<string, number>>;
    /**
     * Constructor for build a Command
     * @param {ShewenyClient} client Client framework
     * @param {CommandData} data Data for build a Command
     */
    constructor(client: ShewenyClient, data: CommandData);
    /**
     * This function is executed before executing the `execute` function
     * @param {CommandInteraction | ContextMenuInteraction | Message} interaction Interaction
     * @returns {any | Promise<any>}
     */
    before?(interaction: CommandInteraction | ContextMenuInteraction | Message): any | Promise<any>;
    /**
     * Main function `execute` for the commands
     * @param {CommandInteraction | ContextMenuInteraction | Message} interaction Interaction
     * @param {CommandMessageArgsResolved[]} [args] Arguments of the Message command
     * @returns {any | Promise<any>}
     */
    abstract execute(interaction: CommandInteraction | ContextMenuInteraction | Message, args?: CommandMessageArgsResolved[]): //args?: CommandMessageArgsResolved
    any | Promise<any>;
    /**
     * Unregister a command from collections
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a command
     * @returns {Promise<Collection<string, Command> | null>} The Application Commands collection
     */
    reload(): Promise<Collection<string, Command> | null>;
    /**
     * Register a command in collections
     * @returns {Collection<string, ApplicationCommand>} The Application Commands collection
     */
    register(): Promise<Collection<string, Command>>;
    private isType;
}
