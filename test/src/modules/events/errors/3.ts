import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'rejectionHandled', {
      emitter: process,
    });
  }
  execute(ctx: any) {
    console.log('Woops... An rejectionHandled error occured :');
    console.log(ctx);
  }
}
