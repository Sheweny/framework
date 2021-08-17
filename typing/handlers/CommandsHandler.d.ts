import { Collection } from "collection-data";
import { SlashHandler } from "../index";
import type { ICommandHandlerOptions } from "../typescript/interfaces/CommandHandler";
import type { ShewenyClient } from "../index";
export declare class CommandsHandler {
    private client;
    private dir;
    slashCommands: SlashHandler | undefined;
    options: ICommandHandlerOptions;
    constructor(client: ShewenyClient, options: ICommandHandlerOptions);
    loadAll(): Promise<Collection<string, import("../typescript/interfaces/Command").Command>>;
    readDirAndPush(d: string): Promise<Array<string>>;
}
