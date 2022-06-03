import { Inhibitor } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { Interaction } from 'discord.js';

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
  onFailure(client: ShewenyClient, interaction: Interaction) {
    if (interaction.isCommand() || interaction.isContextMenuCommand() || interaction.isButton() || interaction.isSelectMenu())
      interaction.reply('Your guild is blacklisted.');
  }
}
