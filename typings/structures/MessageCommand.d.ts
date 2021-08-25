import { Collection } from "collection-data";
import type { ShewenyClient } from "../ShewenyClient";
import type { Message } from "discord.js";
export interface IMessageCommandMeta {
    description?: string;
    category: string;
    only?: "GUILD" | "DM";
    aliases?: string[];
    cooldown?: number;
    userPermissions?: string[];
    clientPermissions?: string[];
}
/**
 * Represent a command
 * @class Command structure
 * @abstract
 */
export declare abstract class MessageCommand {
    client: ShewenyClient | any;
    path?: string;
    only: "GUILD" | "DM";
    name: string;
    description?: string;
    aliases: string[];
    category: string;
    cooldown: number;
    userPermissions: string[];
    clientPermissions: string[];
    cooldowns: Collection<string, Collection<string, number>>;
    /**
     * @constructor
     * @param {ShewenyClient} client - The client
     * @param {string} name - The name of the command
     * @param {ICommandMeta} options - The options of the command
     */
    constructor(client: ShewenyClient, name: string, options: IMessageCommandMeta);
    before?(message: Message, args: string[]): any | Promise<any>;
    abstract execute(message: Message, args: string[]): any | Promise<any>;
    /**
     * Unregister a command
     * @public
     * @returns {boolean}
     */
    unregister(): boolean;
    /**
     * Reload a command
     * @public
     * @async
     * @returns {Promise<Collection<string, MessageCommand> | null>} The commands collection
     */
    reload(): Promise<Collection<string, MessageCommand> | null>;
    /**
     * Register a command
     * @public
     * @async
     * @returns {Collection<string, MessageCommand>} The commands collection
     */
    register(): Promise<Collection<string, MessageCommand>>;
}
