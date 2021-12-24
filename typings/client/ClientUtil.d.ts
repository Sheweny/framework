import { DiscordResolve } from '@sheweny/resolve';
import type { ShewenyClient } from '..';
/**
 * Utility methods and properties for the client.
 */
export declare class ClientUtil extends DiscordResolve {
    client: ShewenyClient;
    constructor(client: ShewenyClient);
    getButtons(): IterableIterator<import("..").Button>;
    getCommands(): IterableIterator<import("..").Command>;
    getEvents(): IterableIterator<import("..").Event>;
    getInhibitors(): IterableIterator<import("..").Inhibitor>;
    getSelectMenus(): IterableIterator<import("..").SelectMenu>;
}
