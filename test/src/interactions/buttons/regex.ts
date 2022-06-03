import { Button, ShewenyClient } from 'sheweny';
import type { ButtonInteraction } from 'discord.js';

export class Btns extends Button {
  constructor(client: ShewenyClient) {
    super(client, [/sheweny-[0-9]{1,2}/]);
  }
  async execute(button: ButtonInteraction) {
    button.reply('Regex work (Sheweny 3.1.0)');
  }
}
