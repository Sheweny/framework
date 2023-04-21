import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { Client } from 'discord.js';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'ready', {
      description: 'Client is logged in',
      once: true,
      emitter: client,
    });
  }
  async execute(client: Client): Promise<void> {
    console.log('Ready 1 : The client is logged in.');
    client.user?.setActivity('with Sheweny V4-dev !');
    // await this.client.managers.commands!.deleteAllCommands(); // (To delete all commands)
  }
}
