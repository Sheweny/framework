import { ICommandMeta } from "../typescript/interfaces/Command";
import type { ApplicationCommandOptionData, ApplicationCommandType } from "discord.js";
import type { ShewenyClient } from "../index";
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
    constructor(client: ShewenyClient, name: string, options: ICommandMeta);
    unregister(): boolean;
    reload(): Promise<any>;
    register(): Promise<any>;
}
