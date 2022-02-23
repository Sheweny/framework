import { CLIENT_MODE } from '../constants/constants';
import type { ShewenyClient } from '../client/Client';
/**
 * Information class for Sheweny.
 */
export class ShewenyInformation {
  constructor(public client: ShewenyClient, public message: string) {
    if (client.mode === CLIENT_MODE.dev) console.log(`\x1b[34m${message}\x1b[0m`);
  }
}
