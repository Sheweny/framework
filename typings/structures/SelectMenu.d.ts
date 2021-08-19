import type { ShewenyClient } from "../index";
export declare class Button {
    client: any;
    path?: string;
    customId: string[];
    constructor(client: ShewenyClient, customId: string[]);
    unregister(): boolean;
    reload(): Promise<any>;
    register(): Promise<any>;
}
