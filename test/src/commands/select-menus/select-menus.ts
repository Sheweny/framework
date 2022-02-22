import { ShewenyClient, Command } from '../../../../';
import type { CommandInteraction } from 'discord.js';
import { SelectMenuComponent, ActionRow, UnsafeSelectMenuOption } from 'discord.js';

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
    const row = new ActionRow().addComponents(
      new SelectMenuComponent()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .addOptions(
          new UnsafeSelectMenuOption().setLabel('First option').setDescription('The first option').setValue('first'),
          new UnsafeSelectMenuOption().setLabel('Second option').setDescription('The second option').setValue('second')
        )
    );
    interaction.reply({ content: 'Test the select-menus', components: [row] });
  }
}
