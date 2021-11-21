import { Event } from '../../../../';
import type { ShewenyClient } from '../../../../';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'uncaughtException', {
      emitter: process,
    });
  }
  execute(ctx: any) {
    console.log('Woops... An uncaughtException error occured :');
    console.log(ctx);
  }
}
