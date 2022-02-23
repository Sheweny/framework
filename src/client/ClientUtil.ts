import { DiscordResolve } from '@sheweny/resolve';
import type { ShewenyClient } from '..';

/**
 * Utility methods and properties for the client.
 */
export class ClientUtil extends DiscordResolve {
  client: ShewenyClient;
  constructor(client: ShewenyClient) {
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

  resolveCommand(command: string) {
    let cmd = this.client.collections.commands.get(command);
    if (cmd) {
      return cmd;
    } else {
      cmd = this.client.collections.commands.find(
        c => c.name.startsWith(command) || (c.aliases != undefined && c.aliases.length != 0 && c.aliases.includes(command)),
      );
    }

    return cmd;
  }
}
