import { Event } from '../../../../';
import type { ShewenyClient } from '../../../../';

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
