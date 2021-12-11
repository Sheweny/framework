import { ShewenyClient, Command } from '../../../../';
import type { CommandInteraction } from 'discord.js';
import { MessageSelectMenu, MessageActionRow } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'select-regex',
      description: 'Send buttons',
      type: 'SLASH_COMMAND',
      category: 'Tests',
    });
  }
  execute(interaction: CommandInteraction) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('select-10')
        .setPlaceholder('Nothing selected')
        .setMaxValues(2)
        .addOptions([
          {
            label: 'First option',
            description: 'The first option',
            value: 'first_option',
          },
          {
            label: 'Second option',
            description: 'The second option',
            value: 'second_option',
          },
        ])
    );
    interaction.reply({ content: 'Test the select-menus', components: [row] });
  }
}
