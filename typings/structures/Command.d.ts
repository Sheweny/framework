import { ICommandMeta } from "../typescript/interfaces/Command";
import type { ApplicationCommandOptionData, ApplicationCommandType } from "discord.js";
import type { ShewenyClient } from "../index";
/**
 * Represent a command
 * @class
 */
export declare class Command {
    client: any;
    path: string | undefined;
    guildOnly: boolean;
    DMOnly: boolean;
    name: string;
    description: string;
    type: ApplicationCommandType | undefined;
    aliases: string[];
    options: Array<ApplicationCommandOptionData> | undefined;
    category: string;
    cooldown: number;
    userPermissions: string[];
    botPermissions: string[];
    subCommands: string[];
    defaultPermission: boolean | undefined;
    /**
     * @param {ShewenyClient} client - The client
     * @param {string} name - The name of the command
     * @param {Object} options - The options of the command
     */
    constructor(client: ShewenyClient, name: string, options: ICommandMeta);
    /**
     * Unregister a command
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a command
     * @returns {boolean|null}
     */
    reload(): Promise<any>;
    /**
     * Register a command
     * @returns {Collection} The commands collection
     */
    register(): Promise<any>;
}
