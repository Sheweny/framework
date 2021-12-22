import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import { COMMAND_CHANNEL } from '../constants/constants';
import type { ShewenyClient } from '../client/Client';
import type { MessageCommandOptionData, CommandMessageArgsResolved } from '../typescript/interfaces';
import type { CommandData, CommandType } from '../typescript/types';
import type { ApplicationCommandOptionData, CommandInteraction, ContextMenuInteraction, Message, PermissionString, AutocompleteInteraction } from 'discord.js';
import type { CommandsManager } from '..';
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
     * Usage of a command
     * @type {string}
     */
    usage?: string | string[];
    /**
     * Examples of a command
     * @type {string}
     */
    examples?: string | string[];
    /**
     * Only channel where a command can be executed
     * @type {"GUILD" | "DM" | undefined}
     */
    channel?: typeof COMMAND_CHANNEL.guild | typeof COMMAND_CHANNEL.dm;
    /**
     * Cooldown of a command in seconds
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
     * The
     * @type {CommandsManager}
     */
    manager?: CommandsManager;
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
    onAutocomplete?(interaction: AutocompleteInteraction): any | Promise<any>;
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
