import { SlashHandler } from '../index';
export declare class CommandsHandler {
    private client;
    private dir;
    slashCommands: SlashHandler | undefined;
    options: any;
    constructor(client: any, options: any);
    loadAll(): Promise<any>;
    readDirAndPush(d: string): Promise<Array<string>>;
}
