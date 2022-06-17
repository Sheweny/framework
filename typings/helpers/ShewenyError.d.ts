import { ShewenyClient } from '../client/Client';
export declare class ShewenyError extends Error {
    constructor(client: ShewenyClient, err: any, ...args: any[]);
}
