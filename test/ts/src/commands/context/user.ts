import { Command } from '../../../../../';
import type { ShewenyClient } from '../../../../../';
import type { ContextMenuInteraction } from 'discord.js';

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

  execute(interaction: ContextMenuInteraction) {
    return interaction.reply({
      content: interaction.options.getUser('user')?.displayAvatarURL({ dynamic: true, format: 'png', size: 512 }),
    });
  }
}
