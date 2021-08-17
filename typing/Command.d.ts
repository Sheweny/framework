import { ICommandMeta } from './typescript/interfaces/Command';
import type { ApplicationCommandOptionData, ApplicationCommandType } from 'discord.js';
import type { ShewenyClient } from './index';
export declare class Command {
    client: any;
    path: string | undefined;
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
    constructor(client: ShewenyClient, name: string, options: ICommandMeta);
    unregister(): boolean;
    reload(): Promise<any>;
    register(): Promise<any>;
}
