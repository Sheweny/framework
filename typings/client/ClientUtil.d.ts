import { DiscordResolve } from '@sheweny/resolve';
import type { ShewenyClient } from '..';
/**
 * Utility methods and properties for the client.
 */
export declare class ClientUtil extends DiscordResolve {
    client: ShewenyClient;
    constructor(client: ShewenyClient);
    getButtons(): import("..").Button[];
    getCommands(): import("..").Command[];
    getEvents(): import("..").Event[];
    getInhibitors(): import("..").Inhibitor[];
    getSelectMenus(): import("..").SelectMenu[];
}
