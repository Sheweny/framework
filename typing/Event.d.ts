import { IEventMeta } from './typescript/CommandsInterfaces';
export declare class Event {
    protected client: any;
    protected path: string | undefined;
    protected name: string;
    protected description: string;
    protected once: boolean;
    constructor(client: any, name: string, options: IEventMeta);
    unregister(): boolean;
    reload(): Promise<any>;
    register(): Promise<any>;
}
