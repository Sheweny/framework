import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { Client } from 'discord.js';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'messageCreate', {
      description: 'A message is created',
    });
  }
  execute(client: Client) {
    console.log('Message created');
  }
}
