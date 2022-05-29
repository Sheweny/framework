import { Command } from '../../../..';
import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';
import type { ShewenyClient } from '../../../..';
import type { CommandInteraction } from 'discord.js';

export default class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'buttons',
      description: 'Test the buttons',
      type: 'SLASH_COMMAND',
      category: 'Misc',
    });
  }

  execute(interaction: CommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder().setCustomId('primary').setLabel('Primary').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('secondary').setLabel('Secondary').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('success').setLabel('Success').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('danger').setLabel('Danger').setStyle(ButtonStyle.Danger),
    ]);
    interaction.reply({ content: 'Test the buttons', components: [row] });
  }
}
