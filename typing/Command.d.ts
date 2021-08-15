import type { ApplicationCommandData } from 'discord.js';
import { ICommandMeta } from './typescript/CommandsInterfaces';
export declare class Command {
    client: any;
    util: any;
    path: string | undefined;
    name: string;
    description: string;
    type: string | undefined;
    aliases: string[];
    options: Array<ApplicationCommandData> | undefined;
    category: string;
    cooldown: number;
    userPermissions: string[];
    botPermissions: string[];
    subCommands: string[];
    defaultPermissions: boolean | undefined;
    constructor(client: any, name: string, options: ICommandMeta);
    unregister(): boolean;
    reload(): Promise<any>;
    register(): Promise<any>;
}
