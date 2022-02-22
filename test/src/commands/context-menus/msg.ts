import { Command } from '../../../../';
import { MessageEmbed } from 'discord.js';
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
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(message.content)
      .setColor('RANDOM')
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
}
