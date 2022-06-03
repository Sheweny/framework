import { Command, ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'ping',
      description: 'Ping !',
      type: 'SLASH_COMMAND',
      channel: 'DM',
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply('Pong !');
  }
}
