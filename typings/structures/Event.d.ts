import { IEventMeta } from "../typescript/interfaces/Event";
import type { ShewenyClient } from "../index";
export declare class Event {
    protected client: any;
    protected path?: string;
    protected name: string;
    protected description: string;
    protected once: boolean;
    constructor(client: ShewenyClient, name: string, options: IEventMeta);
    unregister(): boolean;
    reload(): Promise<any>;
    register(): Promise<any>;
}
