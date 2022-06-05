import type { ShewenyClient } from '../client/Client.js';
/**
 * Information class for Sheweny.
 */
export declare class ShewenyInformation {
    client: ShewenyClient;
    message: string;
    constructor(client: ShewenyClient, message: string);
}
