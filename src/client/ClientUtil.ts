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
    return this.client.collections.buttons.values();
  }
  // COMMANDS
  getCommands() {
    return this.client.collections.commands.values();
  }
  // EVENTS
  getEvents() {
    return this.client.collections.events.values();
  }
  // INHIBITORS
  getInhibitors() {
    return this.client.collections.inhibitors.values();
  }
  // SELECT MENUS
  getSelectMenus() {
    return this.client.collections.selectMenus.values();
  }
}
