import { Command } from '../../../..';
import { ButtonComponent, ActionRow, EnumResolvers } from 'discord.js';
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
    const row = new ActionRow()
      .addComponents(
        new ButtonComponent().setCustomId('primary').setLabel('Primary').setStyle(EnumResolvers.resolveButtonStyle('PRIMARY'))
      )
      .addComponents(
        new ButtonComponent()
          .setCustomId('secondary')
          .setLabel('Secondary')
          .setStyle(EnumResolvers.resolveButtonStyle('SECONDARY'))
      )
      .addComponents(
        new ButtonComponent().setCustomId('success').setLabel('Success').setStyle(EnumResolvers.resolveButtonStyle('SUCCESS'))
      )
      .addComponents(
        new ButtonComponent().setCustomId('danger').setLabel('Danger').setStyle(EnumResolvers.resolveButtonStyle('DANGER'))
      );
    interaction.reply({ content: 'Test the buttons', components: [row] });
  }
}
