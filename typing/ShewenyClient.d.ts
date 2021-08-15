import { Client } from 'discord.js';
import type { Event } from './index';
import type { Command } from './typescript/CommandsInterfaces';
import type { ClientOptions } from 'discord.js';
import { Collection } from 'collection-data';
interface IOptions extends ClientOptions {
    handlers: {
        commands: string;
        events: string;
    };
    commands: Collection<string, Command>;
    events: Collection<string, Event>;
    admins: string[];
}
export declare class ShewenyClient extends Client {
    shewenyOptions: IOptions;
    admins: string[] | undefined;
    handlers: any;
    commands: Collection<string, Command> | undefined;
    events: Collection<string, Event> | undefined;
    commandsType: string | undefined;
    cooldowns: Collection<string, any>;
    constructor(options: IOptions);
    init(dir?: string): Promise<void>;
    awaitReady(): Promise<void>;
}
export {};
