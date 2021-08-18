import type { ShewenyClient } from "../index";
export declare class EventsHandler {
    private client;
    private dir;
    constructor(client: ShewenyClient, dir: string);
    registerAll(): Promise<import("collection-data").Collection<string, import("../typescript/interfaces/Event").Event>>;
    loadAll(): Promise<void>;
    readDirAndPush(d: string): Promise<Array<string>>;
}
