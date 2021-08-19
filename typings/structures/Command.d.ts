import type { ApplicationCommandOptionData, ApplicationCommandType } from "discord.js";
import { Collection } from "collection-data";
import type { ShewenyClient } from "..";
export interface ICommandMeta {
    description: string;
    guildOnly?: boolean;
    DMOnly?: boolean;
    type?: ApplicationCommandType;
    aliases?: string[];
    options?: Array<ApplicationCommandOptionData>;
    category: string;
    cooldown?: number;
    userPermissions?: string[];
    botPermissions?: string[];
    subCommands?: any[];
    defaultPermission?: boolean;
}
/**
 * Represent a command
 * @class
 */
export declare class Command {
    client: any;
    path?: string;
    guildOnly: boolean;
    DMOnly: boolean;
    name: string;
    description: string;
    type?: ApplicationCommandType;
    aliases: string[];
    options?: Array<ApplicationCommandOptionData>;
    category: string;
    cooldown: number;
    userPermissions: string[];
    botPermissions: string[];
    subCommands: string[];
    defaultPermission?: boolean;
    /**
     * @param {ShewenyClient} client - The client
     * @param {string} name - The name of the command
     * @param {ICommandMeta} options - The options of the command
     */
    constructor(client: ShewenyClient, name: string, options: ICommandMeta);
    /**
     * Unregister a command
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a command
     * @returns {Promise<Collection<string, Command> | null>} The commands collection
     */
    reload(): Promise<Collection<string, Command> | null>;
    /**
     * Register a command
     * @returns {Collection<string, Command>} The commands collection
     */
    register(): Promise<Collection<string, Command>>;
}
