import { Command, ShewenyClient } from 'sheweny';
import type { CommandInteraction, Message } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'ping',
      description: 'Ping !',
      type: 'SLASH_COMMAND',
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply('Pong !');
  }
}
export class Ping2Command extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'ping2',
      description: 'Ping ! (two commands in same file)',
      type: 'SLASH_COMMAND',
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply('Pong 2 !');
  }
}

export class PingCommandMessage extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'ping',
      description: 'Ping !',
      type: 'MESSAGE_COMMAND',
    });
  }
  execute(msg: Message) {
    msg.reply('Pong !');
  }
}
