export declare class EventsHandler {
    private client;
    private dir;
    constructor(client: any, dir: string);
    registerAll(): Promise<any>;
    loadAll(): Promise<void>;
    readDirAndPush(d: string): Promise<Array<string>>;
}
