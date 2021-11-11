import { Command, ShewenyClient } from '../../../../';
import type { CommandInteraction } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'ping',
      description: 'Ping the bot',
      type: 'SLASH_COMMAND',
      category: 'Misc',
    });
  }
  execute(interaction: CommandInteraction) {
    console.log(this.manager);

    interaction.reply('Pong !');
  }
}
