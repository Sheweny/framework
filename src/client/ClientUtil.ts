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
  getCommands() {
    return this.client.collections.commands.values();
  }
  getEvents() {
    return this.client.collections.events.values();
  }
  getInhibitors() {
    return this.client.collections.inhibitors.values();
  }
  getButtons() {
    return this.client.collections.buttons.values();
  }
  getSelectMenus() {
    return this.client.collections.selectMenus.values();
  }
}
