import type { ShewenyClient } from "../index";
export declare class ButtonsHandler {
    private client;
    private dir;
    constructor(client: ShewenyClient, dir: string);
    registerAll(): Promise<import("collection-data").Collection<string, import("../typescript/interfaces/Event").Event>>;
    readDirAndPush(d: string): Promise<Array<string>>;
}
