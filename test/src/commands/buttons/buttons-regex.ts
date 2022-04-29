import { Command } from '../../../..';
import { ButtonBuilder, ActionRowBuilder, EnumResolvers } from 'discord.js';
import type { ShewenyClient } from '../../../..';
import type { CommandInteraction } from 'discord.js';

export default class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'buttons-regex',
      description: 'Test the buttons with regex',
      type: 'SLASH_COMMAND',
      category: 'Misc',
    });
  }

  execute(interaction: CommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>();
    row.addComponents([
      new ButtonBuilder().setCustomId('sheweny-1').setLabel('Button').setStyle(EnumResolvers.resolveButtonStyle('SUCCESS')),
      new ButtonBuilder().setCustomId('sheweny-56').setLabel('Button').setStyle(EnumResolvers.resolveButtonStyle('SUCCESS')),
      new ButtonBuilder()
        .setCustomId('sheweny-a')
        .setLabel('Button (not work)')
        .setStyle(EnumResolvers.resolveButtonStyle('DANGER')),
      new ButtonBuilder()
        .setCustomId('sheweny-ab')
        .setLabel('Button (not work)')
        .setStyle(EnumResolvers.resolveButtonStyle('DANGER')),
    ]);
    interaction.reply({ content: 'Test the buttons with regex', components: [row] });
  }
}
