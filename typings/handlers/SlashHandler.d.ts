import type { Collection } from "collection-data";
import type { ApplicationCommandResolvable, ApplicationCommandData, ApplicationCommand, GuildResolvable } from "discord.js";
import type { Collection as DJSCollection } from "discord.js";
import type { ShewenyClient } from "../index";
import type { Command } from "../typescript/interfaces/interfaces";
/**
 * Manage slash-commands.
 * @class
 */
export declare class SlashHandler {
    private commands;
    private client;
    /**
     * @param {ShewenyClient} client - The client
     */
    constructor(client: ShewenyClient);
    /**
     * Get an array of commands configuration for register it
     * @param {Collection<string, Command>} commands - The commands
     * @returns {ApplicationCommandData[]}
     */
    getData(commands: Collection<string, Command>): ApplicationCommandData[];
    /**
     * Register commands
     * @param {Collection<string, Command>} commands - The commands to register
     * @param {string} [guildId] - The guild to register commands
     * @returns {Promise<DJSCollection<string, ApplicationCommand<{}>> | DJSCollection<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined>} The application commands
     */
    registerCommands(commands?: Collection<string, any>, guildId?: string): Promise<DJSCollection<string, ApplicationCommand<{}>> | DJSCollection<string, ApplicationCommand<{
        guild: GuildResolvable;
    }>> | undefined>;
    /**
     * Create a command
     * @param {Collection<string, Command>} commands - The commands to register
     * @param {string} [guildId] - The guild to register commands
     * @returns {Promise<DJSCollection<string, ApplicationCommand<{}>> | DJSCollection<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined>} The application commands
     */
    createCommand(command: Command, guildId?: string): Promise<ApplicationCommand<{}> | ApplicationCommand<{
        guild: GuildResolvable;
    }> | undefined>;
    /**
     * Edit a command
     * @param {ApplicationCommandResolvable} oldCommand - The commands to edit
     * @param {Command} newCommand - The commands to edit
     * @param {string} [guildId] - The guild to edit commands
     * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>} The application commands
     */
    editCommand(oldCommand: ApplicationCommandResolvable, newCommand: Command, guildId?: string): Promise<ApplicationCommand<{}> | ApplicationCommand<{
        guild: GuildResolvable;
    }> | undefined>;
    /**
     * Delete command
     * @param {ApplicationCommandResolvable} command - The commands to delete
     * @param {string} [guildId] - The guild to delete commands
     * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>} Delete function
     */
    deleteCommand(command: ApplicationCommandResolvable, guildId?: string): Promise<any>;
    /**
     * Delete all commands
     * @param {string} [guildId] - The guild to delete commands
     * @returns {Promise<DJSCollection<string, ApplicationCommand<{}>> | DJSCollection<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined>} The application commands
     */
    deleteAllCommands(guildId?: string): Promise<DJSCollection<string, ApplicationCommand<{}>> | DJSCollection<string, ApplicationCommand<{
        guild: GuildResolvable;
    }>> | undefined>;
}
