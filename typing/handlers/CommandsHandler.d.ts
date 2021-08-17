import { Collection } from 'collection-data';
import { SlashHandler } from '../index';
import type { IOptions } from '../typescript/interfaces/CommandHandler';
import type { ShewenyClient } from '../index';
export declare class CommandsHandler {
    private client;
    private dir;
    slashCommands: SlashHandler | undefined;
    options: IOptions;
    constructor(client: ShewenyClient, options: IOptions);
    loadAll(): Promise<Collection<string, import("../typescript/interfaces/Command").Command>>;
    readDirAndPush(d: string): Promise<Array<string>>;
}
