import { Command, ShewenyClient } from '../../../../';
import type { CommandInteraction } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'ping3test',
      description: 'Ping the bot',
      type: 'SLASH_COMMAND',
      category: 'Misc',
      userPermissions: ['ADMINISTRATOR'],
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply('Pong 2 !');
  }
}
