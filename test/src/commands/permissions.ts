import { Command, ShewenyClient } from '../../../';
import type { CommandInteraction } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'permissions',
      description: 'Ping the bot',
      type: 'SLASH_COMMAND',
      category: 'Misc',
      userPermissions: ['MANAGE_MESSAGES'],
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply('You have MANAGE_MESSAGES permission.');
  }
}
