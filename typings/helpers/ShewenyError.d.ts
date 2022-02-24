import { ShewenyClient } from '../client/Client';
export declare class ShewenyError extends Error {
    constructor(client: ShewenyClient, err: string | Error, ...args: string[]);
}
