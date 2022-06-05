import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'unhandledRejection', {
      emitter: process,
    });
  }
  execute(ctx: any) {
    console.log('Woops... An unhandledRejection error occured :');
    console.log(ctx);
  }
}
