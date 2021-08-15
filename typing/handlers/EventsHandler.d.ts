import { Collection } from 'collection-data';
import type { ShewenyClient } from '../index';
export declare class EventsHandler {
    private client;
    private dir;
    constructor(client: ShewenyClient, dir: string);
    registerAll(): Promise<Collection<string, import("../typescript/interfaces/EventType").EventType>>;
    loadAll(): Promise<void>;
    readDirAndPush(d: string): Promise<Array<string>>;
}
