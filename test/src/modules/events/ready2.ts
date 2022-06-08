import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'ready', {
      description: 'Client is logged in',
      once: true,
      emitter: client,
    });
  }
  async execute(): Promise<void> {
    console.log('Ready 2 : The client is logged in.');
  }
}
