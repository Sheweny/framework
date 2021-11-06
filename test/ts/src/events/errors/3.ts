import { Event } from '../../../../../';
import type { ShewenyClient } from '../../../../../';

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
