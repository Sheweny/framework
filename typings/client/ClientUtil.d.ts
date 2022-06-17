import { DiscordResolve } from '@sheweny/resolve';
import type { ShewenyClient } from '..';
/**
 * Utility methods and properties for the client.
 */
export declare class ClientUtil extends DiscordResolve {
    client: ShewenyClient;
    constructor(client: ShewenyClient);
    getCommands(): IterableIterator<import("..").Command>;
    getEvents(): IterableIterator<import("..").Event>;
    getInhibitors(): IterableIterator<import("..").Inhibitor>;
    getButtons(): IterableIterator<import("..").Button>;
    getSelectMenus(): IterableIterator<import("..").SelectMenu>;
}
