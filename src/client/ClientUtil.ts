import { DiscordResolve } from '@sheweny/resolve';
import type { Command } from '../structures/index.js';
import type { ShewenyClient } from './Client.js';

/**
 * Utility methods and properties for the client.
 */
export class ClientUtil extends DiscordResolve {
  constructor(client: ShewenyClient) {
    super(client);
  }
  // BUTTONS
  public getButtons() {
    return this.client.collections.buttons.toJSON();
  }
  // COMMANDS
  public getCommands() {
    return this.client.collections.commands.toJSON();
  }
  // EVENTS
  public getEvents() {
    return this.client.collections.events.toJSON();
  }
  // INHIBITORS
  public getInhibitors() {
    return this.client.collections.inhibitors.toJSON();
  }
  // SELECT MENUS
  public getSelectMenus() {
    return this.client.collections.selectMenus.toJSON();
  }

  /* Resolve */

  public resolveCommand(command: string) {
    let cmd = this.client.collections.commands.get(command);
    if (cmd) {
      return cmd;
    } else {
      cmd = this.client.collections.commands.find(
        (c: Command) =>
          c.name.startsWith(command) || (c.aliases != undefined && c.aliases.length != 0 && c.aliases.includes(command)),
      );
    }
    return cmd;
  }
}
