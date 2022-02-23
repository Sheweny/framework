import { EnumResolvers } from 'discord.js';
import type { ThreadChannel } from 'discord.js';
import type { ShewenyClient } from '../client/Client';

export default async function run(client: ShewenyClient, thread: ThreadChannel) {
  if (client.joinThreadsOnCreate && thread.joinable && thread.type !== EnumResolvers.resolveChannelType('GUILD_PRIVATE_THREAD')) {
    await thread.join();
  }
}
