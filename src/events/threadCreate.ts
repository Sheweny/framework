import { ChannelType, ThreadChannel } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';

export default async function run(client: ShewenyClient, thread: ThreadChannel) {
  if (client.joinThreadsOnCreate && thread.joinable && thread.type !== ChannelType.GuildPrivateThread) {
    await thread.join();
  }
}
