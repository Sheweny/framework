import { Command } from '../../../../';
import type { ShewenyClient } from '../../../../';
import type { ContextMenuCommandInteraction } from 'discord.js';

export class GetAvatar extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'display-avatar',
      type: 'CONTEXT_MENU_USER',
      category: 'Misc',
      description: 'Get avatar of user',
      cooldown: 10,
    });
  }

  execute(interaction: ContextMenuCommandInteraction) {
    return interaction.reply({
      content: interaction.options.getUser('user')?.displayAvatarURL(),
    });
  }
}
