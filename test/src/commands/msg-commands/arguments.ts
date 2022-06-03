import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { Message } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'arguments',
      description: 'Test arguments',
      type: 'MESSAGE_COMMAND',
      category: 'Misc',
      args: [
        {
          name: 'user',
          type: 'USER',
        },
        {
          name: 'member',
          type: 'MEMBER',
        },
        {
          name: 'channel',
          type: 'CHANNEL',
        },
        {
          name: 'emoji',
          type: 'GUILD_EMOJI',
        },
        {
          name: 'role',
          type: 'ROLE',
        },
        {
          name: 'guild',
          type: 'GUILD',
        },
      ],
    });
  }
  execute(message: Message, args: any) {
    console.log(args);
  }
}
