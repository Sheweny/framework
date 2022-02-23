import type { ShewenyClient } from '../client/Client';

export default async function run(client: ShewenyClient) {
  client.connected = true;
}
