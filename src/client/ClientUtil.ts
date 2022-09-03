import { DiscordResolve } from '@sheweny/resolve';
import type { Command } from '../structures/index';
import type { ShewenyClient } from './Client.js';

/**
 * Utility methods and properties for the client.
 */
export class ClientUtil extends DiscordResolve {
  public override client: ShewenyClient;
  constructor(client: ShewenyClient) {
    super(client);
    this.client = client;
  }
  // BUTTONS
  public getButtons() {
    return this.client.collections.buttons.toJSON().flat(1);
  }
  // COMMANDS
  public getCommands(): Command[] {
    console.log(
      '------------------------------getCommands() is deprecated, use getCommand() instead.---------------------------------',
    );

    return this.client.collections.commands
      .toJSON()
      .map((c: Command[]) => c.flat(1))
      .flat(1);
  }
  // EVENTS
  public getEvents() {
    return this.client.collections.events.toJSON().flat(1);
  }
  // INHIBITORS
  public getInhibitors() {
    return this.client.collections.inhibitors.toJSON().flat(1);
  }
  // SELECT MENUS
  public getSelectMenus() {
    return this.client.collections.selectMenus.toJSON().flat(1);
  }

  /* Resolve */

  public resolveCommand(command: string) {
    let cmd: Command | Command[] | undefined = this.client.collections.commands.get(command);
    if (cmd) {
      return cmd;
    } else {
      cmd = this.client.collections.commands.find((cd: Command[]) =>
        cd.some(
          c => c.name.startsWith(command) || (c.aliases != undefined && c.aliases.length != 0 && c.aliases.includes(command)),
        ),
      );
    }
    return cmd;
  }
}
