import { Client } from "discord.js";
import type { Command } from "./typescript/interfaces/Command";
import type { Event } from "./typescript/interfaces/Event";
import { Button } from "./typescript/interfaces/Button";
import type { IShewenyClientOptions, IClientHandlers } from "./typescript/interfaces/ShewenyClient";
import { Collection } from "collection-data";
export declare class ShewenyClient extends Client {
    shewenyOptions: IShewenyClientOptions;
    admins?: string[];
    handlers: IClientHandlers;
    commands: Collection<string, Command>;
    events: Collection<string, Event>;
    buttons: Collection<string[], Button>;
    commandsType?: string;
    cooldowns: Collection<string, Collection<string, number>>;
    constructor(options: IShewenyClientOptions);
    init(dir?: string): Promise<void>;
    awaitReady(): Promise<void>;
}
