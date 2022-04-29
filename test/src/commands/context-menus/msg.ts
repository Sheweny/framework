import { Command } from '../../../../';
import { EmbedBuilder } from 'discord.js';
import type { ShewenyClient } from '../../../../';
import type { ContextMenuCommandInteraction } from 'discord.js';

export class GetAvatar extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'send-embed',
      type: 'CONTEXT_MENU_MESSAGE',
      category: 'Misc',
      description: 'Get avatar of user',
      cooldown: 10,
    });
  }

  async execute(interaction: ContextMenuCommandInteraction) {
    const message = await interaction.channel!.messages.fetch(interaction.targetId);
    const embed = new EmbedBuilder()
      .setAuthor({ iconURL: message.author.displayAvatarURL(), name: message.author.tag })
      .setDescription(message.content)
      .setColor(111111)
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
}
