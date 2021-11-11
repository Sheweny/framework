import { Button, ShewenyClient } from '../../../../';
import type { ButtonInteraction } from 'discord.js';

export class Btns extends Button {
  constructor(client: ShewenyClient) {
    super(client, ['primary', 'secondary', 'success', 'danger']);
  }
  async execute(button: ButtonInteraction) {
    switch (button.customId) {
      case 'primary':
        button.reply('You have clicked on primary button !');
        break;
      case 'secondary':
        button.reply('You have clicked on secondary button !');
        break;
      case 'success':
        button.reply('You have clicked on success button !');
        break;
      case 'danger':
        button.reply('You have clicked on danger button !');
        break;
    }
  }
}
