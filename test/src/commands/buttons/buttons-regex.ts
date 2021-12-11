import { Command } from '../../../..';
import { MessageButton, MessageActionRow } from 'discord.js';
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
    const row = new MessageActionRow()
      .addComponents(new MessageButton().setCustomId('sheweny-1').setLabel('Button').setStyle('SUCCESS'))
      .addComponents(new MessageButton().setCustomId('sheweny-56').setLabel('Button').setStyle('SUCCESS'))
      .addComponents(new MessageButton().setCustomId('sheweny-a').setLabel('Button (not work)').setStyle('DANGER'))
      .addComponents(new MessageButton().setCustomId('sheweny-ab').setLabel('Button (not work)').setStyle('DANGER'));
    interaction.reply({ content: 'Test the buttons with regex', components: [row] });
  }
}
