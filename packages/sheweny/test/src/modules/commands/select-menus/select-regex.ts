import { ShewenyClient, Command } from 'sheweny';
import { CommandInteraction, SelectMenuBuilder } from 'discord.js';
import { ActionRowBuilder, SelectMenuOptionBuilder } from 'discord.js';

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
    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents([
      new SelectMenuBuilder()
        .setCustomId('select-10')
        .setPlaceholder('Nothing selected')
        .setMaxValues(2)
        .addOptions([
          new SelectMenuOptionBuilder().setLabel('First option').setDescription('The first option').setValue('first'),
          new SelectMenuOptionBuilder().setLabel('Second option').setDescription('The second option').setValue('second'),
        ]),
    ]);
    console.log(row);
    //interaction.reply({ content: 'Test the select-menus', components: [row] });
  }
}
