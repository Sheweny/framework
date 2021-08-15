export declare class EventsHandler {
    private client;
    private dir;
    constructor(client: any, dir: string);
    loadAll(): Promise<any>;
    registerAll(): Promise<void>;
    readDirAndPush(d: string): Promise<Array<string>>;
}
