"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUtil = void 0;
const resolve_1 = require("@sheweny/resolve");
/**
 * Utility methods and properties for the client.
 */
class ClientUtil extends resolve_1.DiscordResolve {
    constructor(client) {
        super(client);
        this.client = client;
    }
    // BUTTONS
    getButtons() {
        return Array.from(this.client.collections.buttons.values());
    }
    // COMMANDS
    getCommands() {
        return Array.from(this.client.collections.commands.values());
    }
    // EVENTS
    getEvents() {
        return Array.from(this.client.collections.events.values());
    }
    // INHIBITORS
    getInhibitors() {
        return Array.from(this.client.collections.inhibitors.values());
    }
    // SELECT MENUS
    getSelectMenus() {
        return Array.from(this.client.collections.selectMenus.values());
    }
    /* Resolve */
    resolveCommand(command) {
        let cmd = this.client.collections.commands.get(command);
        if (cmd) {
            return cmd;
        }
        else {
            cmd = this.client.collections.commands.find(c => c.name.startsWith(command) || (c.aliases != undefined && c.aliases.length != 0 && c.aliases.includes(command)));
        }
        return cmd;
    }
}
exports.ClientUtil = ClientUtil;
