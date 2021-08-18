import type { Collection } from "collection-data";
import type { ApplicationCommandResolvable, ApplicationCommandData, ApplicationCommand } from "discord.js";
import type { Collection as DJSCollection } from 'discord.js';
import type { ShewenyClient } from "../index";
import type { Command } from "../typescript/interfaces/Command";
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
     * @returns {Array<}
     */
    getData(commands: Collection<string, Command>): ApplicationCommandData[];
    /**
     * Register commands
     * @param {Collection<string, Command>} commands - The commands to register
     * @param {string} [guildId] - The guild to register commands
     * @returns {Promise<DJSCollection<string, ApplicationCommand<{}>> | undefined | null>} The application commands
     */
    registerCommands(commands?: Collection<string, any>, guildId?: string): Promise<DJSCollection<string, ApplicationCommand<{}>> | undefined | null>;
    /**
     * Create a command
     * @param {Collection<string, Command>} commands - The commands to register
     * @param {string} [guildId] - The guild to register commands
     * @returns {Promise<any>} The application commands
     */
    createCommand(command: Command, guildId?: string): Promise<any>;
    /**
     * Edit a command
     * @param {ApplicationCommandResolvable} cmd - The commands to edit
     * @param {Command} newCommand - The commands to edit
     * @param {string} [guildId] - The guild to edit commands
     * @returns {Promise<any>} The application commands
     */
    editCommand(cmd: ApplicationCommandResolvable, newCommand: Command, guildId?: string): Promise<any>;
    /**
     * Delete command
     * @param {ApplicationCommandResolvable} command - The commands to delete
     * @param {string} [guildId] - The guild to delete commands
     * @returns {Promise<any>} Delete function
     */
    deleteCommand(command: ApplicationCommandResolvable, guildId?: string): Promise<any>;
    /**
     * Delete all commands
     * @param {string} [guildId] - The guild to delete commands
     * @returns {Promise<DJSCollection<string, ApplicationCommand<{}>> | undefined | null>} The application commands
     */
    deleteAllCommands(guildId?: string): Promise<DJSCollection<string, ApplicationCommand<{}>> | undefined>;
}
