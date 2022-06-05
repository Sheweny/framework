import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'debug', {
      description: 'Dev',
      once: true,
      emitter: client,
    });
  }
  async execute(...debug:string[]): Promise<void> {
    console.log(...debug)
  }
}
