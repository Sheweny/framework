import { Command } from '../../..';
import { MessageButton, MessageActionRow } from 'discord.js';
import type { ShewenyClient } from '../../..';
import type { CommandInteraction } from 'discord.js';

export default class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'buttons',
      description: 'Test the buttons',
      type: 'SLASH_COMMAND',
      category: 'Misc',
      userPermissions: ['BAN_MEMBERS'],
    });
  }

  execute(interaction: CommandInteraction) {
    const row = new MessageActionRow()
      .addComponents(new MessageButton().setCustomId('primary').setLabel('Primary').setStyle('PRIMARY'))
      .addComponents(new MessageButton().setCustomId('secondary').setLabel('Secondary').setStyle('SECONDARY'))
      .addComponents(new MessageButton().setCustomId('success').setLabel('Success').setStyle('SUCCESS'))
      .addComponents(new MessageButton().setCustomId('danger').setLabel('Danger').setStyle('DANGER'));
    interaction.reply({ content: 'Test the buttons', components: [row] });
  }
}
