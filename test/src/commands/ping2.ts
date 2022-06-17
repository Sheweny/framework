import { Command, ShewenyClient } from '../../../';
import type { CommandInteraction } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'ping',
      description: 'Ping !',
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply('Pong !');
  }
}