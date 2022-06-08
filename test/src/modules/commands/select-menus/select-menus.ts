import { ShewenyClient, Command } from 'sheweny';
import { CommandInteraction } from 'discord.js';
import { SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'select-menus',
      description: 'Send buttons',
      type: 'SLASH_COMMAND',
      category: 'Tests',
    });
  }
  execute(interaction: CommandInteraction) {
    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
      new SelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .addOptions([
          { label: 'Option 1', description: 'The first option', value: 'option-1' },
          { label: 'Option 2', description: 'The second option', value: 'option-2' },
        ]),
    );
    interaction.reply({ content: 'Test the select-menus', components: [row] });
  }
}
