import { Command, ShewenyClient } from '../../../../../';
import type { Message } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'test-msg',
      description: 'Test message command',
      type: 'MESSAGE_COMMAND',
      category: 'Test',
    });
  }
  execute(msg: Message) {
    msg.reply('Message commands work with V3 !');
  }
}
