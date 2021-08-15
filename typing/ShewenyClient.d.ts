import { Client } from 'discord.js';
import type { CommandType } from './typescript/interfaces/CommandType';
import type { EventType } from './typescript/interfaces/EventType';
import type { IOptions, IClientHandlers } from './typescript/interfaces/ShewenyClient';
import { Collection } from 'collection-data';
export declare class ShewenyClient extends Client {
    shewenyOptions: IOptions;
    admins: string[] | undefined;
    handlers: IClientHandlers;
    commands: Collection<string, CommandType>;
    events: Collection<string, EventType>;
    commandsType: string | undefined;
    cooldowns: Collection<string, Collection<string, number>>;
    constructor(options: IOptions);
    init(dir?: string): Promise<void>;
    awaitReady(): Promise<void>;
}
