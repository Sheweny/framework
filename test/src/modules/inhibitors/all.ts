import { Inhibitor } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { CommandInteraction, Interaction, InteractionType, MessageComponentInteraction } from 'discord.js';

export class BlackListInhibitor extends Inhibitor {
  constructor(client: ShewenyClient) {
    super(client, 'blacklist', {
      type: ['BUTTON'],
    });
  }
  execute(client: ShewenyClient, ctx: Interaction) {
    console.log('Inhibitor called');
    return !['809702809196560405'].includes(ctx.guildId!);
  }
  onFailure(client: ShewenyClient, interaction: CommandInteraction | MessageComponentInteraction) {
    if (interaction.type === InteractionType.ApplicationCommand || interaction.type === InteractionType.MessageComponent)
      interaction.reply('Your guild is blacklisted.');
  }
}
