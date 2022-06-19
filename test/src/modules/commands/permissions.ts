import { Command, ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'permissions',
      description: 'Ping the bot',
      type: 'SLASH_COMMAND',
      category: 'Misc',
      userPermissions: ['ManageMessages'],
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply('You have MANAGE_MESSAGES permission.');
  }
}