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
     * If a command is reserved for bot admins
     * @type {boolean}
     */
    adminsOnly: boolean;
    /**
     * Aliases of the Message command
     * @type {string[] | undefined}
     */
    aliases?: string[];
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
    channel?: typeof COMMAND_CHANNEL.guild | typeof COMMAND_CHANNEL.dm;
    /**
     * The permissions required for the client
     * @type {PermissionString[]}
     */
    clientPermissions: PermissionString[];
    /**
     * Cooldown of a command in seconds
     * @type {number}
     */
    cooldown: number;
    /**
     * Cooldowns collection
     * @type {Collection<string, Collection<string, number>>}
     */
    cooldowns: Collection<string, Collection<string, number>>;
    /**
     * Default permission of a Application command
     * @type {boolean | undefined}
     */
    defaultPermission?: boolean;
    /**
     * Description of a command
     * @type {string | undefined}
     */
    description?: string;
    /**
     * Examples of a command
     * @type {string}
     */
    examples?: string | string[];
    /**
     * The
     * @type {CommandsManager}
     */
    manager?: CommandsManager;
    /**
     * Name of a command
     * @type {string}
     */
    name: string;
    /**
     * Options of a Application command
     * @type {ApplicationCommandOptionData[] | undefined}
     */
    options?: ApplicationCommandOptionData[];
    /**
     * Type of a command
     * @type {CommandType}
     */
    type: CommandType;
    /**
     * Usage of a command
     * @type {string}
     */
    usage?: string | string[];
    /**
     * The permissions required to be executed by the user
     * @type {PermissionString[]}
     */
    userPermissions: PermissionString[];
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
     * Check the type of a command
     * @param type - Type of a command
     * @param types - Types allowed
     * @returns {boolean}
     */
    private isType;
    /**
     *
     * @param {AutocompleteInteraction} interaction
     * @returns {any | Promise<any>}
     */
    onAutocomplete?(interaction: AutocompleteInteraction): any | Promise<any>;
    /**
     * Register a command in collections
     * @returns {Collection<string, ApplicationCommand>} The Application Commands collection
     */
    register(): Promise<Collection<string, Command>>;
    /**
     * Reload a command
     * @returns {Promise<Collection<string, Command> | null>} The Application Commands collection
     */
    reload(): Promise<Collection<string, Command> | null>;
    /**
     * Unregister a command from collections
     * @returns {boolean}
     */
    unregister(): boolean;
}
