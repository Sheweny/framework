import { Event } from '../../../../';
import type { ShewenyClient } from '../../../../';
import type { Client } from 'discord.js';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'ready', {
      description: 'Client is logged in',
      once: true,
      emitter: client,
    });
  }
  execute(client: Client) {
    console.log('The client is logged in...');
    client.user?.setActivity('with Sheweny V3 !');
  }
}
