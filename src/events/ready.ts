import type { ShewenyClient } from '../client/Client.js';

export default async function run(client: ShewenyClient) {
  client.connected = true;
}
