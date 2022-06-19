import { Command, ShewenyClient } from 'sheweny';
import type { CommandInteraction, Message } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'ping-locale',
      nameLocalizations: {
        'en-US': 'en-us-ping',
      },
      description: 'ping default description',
      descriptionLocalizations: {
        'en-US': 'ping en-US description',
      },
      type: 'SLASH_COMMAND',
      channel: 'GLOBAL',
    });
  }
  execute(interaction: CommandInteraction) {
    /* eslint-disable-next-line */
    //@ts-ignore
    interaction.a.b;
    interaction.reply('Pong !');
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
