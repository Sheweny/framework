import { Collection } from 'discord.js';
import type { Collection as CollectionDjs, ApplicationCommand, ApplicationCommandData, ApplicationCommandResolvable, GuildResolvable, Snowflake } from 'discord.js';
import { BaseManager } from '.';
import type { ShewenyClient, Command } from '..';
import type { CommandsManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Commands
 * @extends {EventEmitter}
 */
export declare class CommandsManager extends BaseManager {
    /**
     * ID of the guild where are set Applications Commands
     * @type {string | undefined}
     */
    guildId?: Snowflake | Snowflake[];
    /**
     * Prefix for the Message Commands
     * @type {string | undefined}
     */
    prefix?: string;
    /**
     * If the applications commands are disabled according to the `userPermissions` array
     * @type {boolean | undefined}
     */
    applicationPermissions?: boolean;
    /**
     * Register application commands
     * @type {boolean}
     */
    autoRegisterApplicationCommands: boolean;
    /**
     * Collection of the commands
     * @type {Collection<string, Command> | undefined}
     */
    commands?: Collection<string, Command>;
    /**
     * Constructor to manage commands
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the commands folder
     * @param {CommandsManagerOptions} [options] Options of the commands manager
     */
    constructor(client: ShewenyClient, options: CommandsManagerOptions);
    /**
     * Load all commands in collection
     * @returns {Promise<Collection<string, Command>>}
     */
    loadAll(): Promise<Collection<string, Command> | undefined>;
    /**
     * Load all and Register Application commands
     * @returns {Promise<void>}
     */
    loadAndRegisterAll(): Promise<void>;
    /**
     * Rename command type to the type of Application command
     * @param {"SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"} type Type of command
     * @returns {ApplicationCommandType | undefined}
     */
    private renameCommandType;
    /**
     * Get data of Application Command
     * @param {Collection<string, Command> | Command | undefined} [commands] The command(s) to obtain their data
     * @returns {ApplicationCommandData[] | ApplicationCommandData | undefined}
     */
    getData(commands?: Collection<string, Command> | Command | undefined): ApplicationCommandData[] | ApplicationCommandData | undefined;
    /**
     * Set all application commands from the collection of commands in the client application
     * @param {Collection<string, Command> | undefined} [commands] Collection of the commands
     * @returns {Promise<CollectionDjs<Snowflake, ApplicationCommand<{}>> | CollectionDjs<Snowflake, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
     */
    registerAllApplicationCommands(commands?: Collection<string, Command> | undefined, guildId?: Snowflake | Snowflake[] | undefined): Promise<CollectionDjs<Snowflake, ApplicationCommand<{}>> | CollectionDjs<Snowflake, ApplicationCommand<{
        guild: GuildResolvable;
    }>> | boolean | undefined>;
    /**
     * Set permissions for each commands in guild
     * @param {CollectionDjs<string, ApplicationCommand<{}>> | undefined} [applicationCommands] Commands coming from the client's application
     * @param {Collection<string, Command> | undefined} [commandsCollection] Commands coming from the collection of the commands
     * @param {Snowflake | undefined} [guildId] Guild ID where permissions will be set
     * @returns {Promise<void>}
     */
    registerPermissions(applicationCommands?: CollectionDjs<string, ApplicationCommand<{}>> | undefined, commandsCollection?: Collection<string, Command> | undefined, guildId?: Snowflake | Snowflake[] | undefined): Promise<void | boolean>;
    /**
     * Create a command in the client's application commands
     * @param {Command} command Command to create
     * @param {Snowflake | undefined} [guildId] Guild ID where the order will be created
     * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
     */
    createCommand(command: Command, guildId?: Snowflake): Promise<ApplicationCommand<{}> | ApplicationCommand<{
        guild: GuildResolvable;
    }> | undefined>;
    /**
     * Edit an command with a new command in the client's application commands
     * @param {ApplicationCommandResolvable} oldCommand Command edited
     * @param {Command} newCommand The new command that will take the place of the old one
     * @param {Snowflake | undefined} [guildId] Guild ID where the order will be edited
     * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
     */
    editCommand(oldCommand: ApplicationCommandResolvable, newCommand: Command, guildId?: Snowflake): Promise<ApplicationCommand<{}> | ApplicationCommand<{
        guild: GuildResolvable;
    }> | undefined>;
    /**
     * Removes an command from the client's application commands
     * @param {ApplicationCommandResolvable} command Command deleted
     * @param {Snowflake | undefined} [guildId] Guild ID where the command will be deleted
     * @returns {Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined>}
     */
    deleteCommand(command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommand<{
        guild: GuildResolvable;
    }> | null | undefined>;
    /**
     * Delete all commands from the client's application commands
     * @param {Snowflake | undefined} [guildId] Guild ID where all commands will be deleted
     * @returns {Promise<CollectionDjs<string, ApplicationCommand<{}>> | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
     */
    deleteAllCommands(guildId?: Snowflake): Promise<CollectionDjs<string, ApplicationCommand<{}>> | CollectionDjs<string, ApplicationCommand<{
        guild: GuildResolvable;
    }>> | undefined>;
}
