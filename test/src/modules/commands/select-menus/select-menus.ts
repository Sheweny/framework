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
    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents([
      new SelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .addOptions([
          new SelectMenuOptionBuilder().setLabel('First option').setDescription('The first option').setValue('first'),
          new SelectMenuOptionBuilder().setLabel('Second option').setDescription('The second option').setValue('second'),
        ]),
    ]);
    interaction.reply({ content: 'Test the select-menus', components: [row] });
  }
}
