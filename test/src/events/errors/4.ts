import { Event } from '../../../../';
import type { ShewenyClient } from '../../../../';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'warning', {
      emitter: process,
    });
  }
  execute(ctx: any) {
    console.log('Woops... An warning occured :');
    console.log(ctx);
  }
}