/// <reference types="node" />
import { Collection } from "collection-data";
import { ApplicationCommandResolvable, ApplicationCommandData, ApplicationCommand as ApplicationCommandDjs, GuildResolvable, Collection as CollectionDjs, Client } from "discord.js";
import { ShewenyClient } from "../ShewenyClient";
import { ApplicationCommand } from "../structures";
import { EventEmitter } from "events";
import type { ILoadAllApplicationCommand } from "../typescript/interfaces/interfaces";
/**
 * Create Application Command handler
 * @class Application Command Handler
 */
export declare class ApplicationCommandsHandler extends EventEmitter {
    private applicationCommands?;
    private client;
    private dir;
    /**
     * @constructor
     * @param {ShewenyClient | Client} client - The client
     */
    constructor(client: ShewenyClient | Client, directory: string, loadAll?: ILoadAllApplicationCommand);
    /**
     * Load all commands and register them to a collection.
     * @public
     * @async
     * @param {string} [guildId] - The guild to register command
     * @returns {Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable; }>> | undefined>} The application commands
     */
    loadAllAndRegister(guildId?: string): Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{
        guild: GuildResolvable;
    }>> | undefined>;
    /**
     * Load all commands and register them to a collection.
     * @public
     * @async
     * @returns {Promise<Collection<string, ApplicationCommand>>} The collection of commands
     */
    loadAll(): Promise<Collection<string, ApplicationCommand>>;
    /**
     * Get an array of application commands configuration for register it
     * @public
     * @param {Collection<string, ApplicationCommand>} applicationCommands - The application commands
     * @returns {ApplicationCommandData[]}
     */
    getData(applicationCommands: Collection<string, ApplicationCommand>): ApplicationCommandData[];
    /**
     * Register application commands
     * @public
     * @async
     * @param {Collection<string, ApplicationCommand>} applicationCommands - The application commands to register
     * @param {string} [guildId] - The guild to register context menus
     * @returns {Promise<CollectionDjs<string, ApplicationCommand<{}>> | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined>} The application commands
     */
    registerCommands(applicationCommands?: Collection<string, ApplicationCommand> | undefined, guildId?: string): Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{
        guild: GuildResolvable;
    }>> | undefined>;
    /**
     * Create a Application Command
     * @public
     * @async
     * @param {Command} applicationCommand - The application command to register
     * @param {string} [guildId] - The guild to register command
     * @returns {Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable; }>> | undefined>} The application commands
     */
    createCommand(applicationCommand: ApplicationCommand, guildId?: string): Promise<ApplicationCommandDjs<{}> | ApplicationCommandDjs<{
        guild: GuildResolvable;
    }> | undefined>;
    /**
     * Edit a application command
     * @public
     * @async
     * @param {ApplicationCommandResolvable} oldCommand - The command to edit
     * @param {ApplicationCommand} newCommand - The new application command to edit
     * @param {string} [guildId] - The guild to edit command
     * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>} The application commands
     */
    editCommand(oldCommand: ApplicationCommandResolvable, newCommand: ApplicationCommand, guildId?: string): Promise<ApplicationCommandDjs<{}> | ApplicationCommandDjs<{
        guild: GuildResolvable;
    }> | undefined>;
    /**
     * Delete application command
     * @public
     * @async
     * @param {ApplicationCommandResolvable} command - The command to delete
     * @param {string} [guildId] - The guild to delete command
     * @returns {Promise<ApplicationCommandDjs<{}> | ApplicationCommandDjs<{ guild: GuildResolvable }> | undefined>} Delete function
     */
    deleteCommand(command: ApplicationCommandResolvable, guildId?: string): Promise<ApplicationCommandDjs<{
        guild: GuildResolvable;
    }> | null | undefined>;
    /**
     * Delete all application commands
     * @public
     * @async
     * @param {string} [guildId] - The guild to delete commands
     * @returns {Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable; }>> | undefined>} The application commands
     */
    deleteAllCommands(guildId?: string): Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{
        guild: GuildResolvable;
    }>> | undefined>;
}
