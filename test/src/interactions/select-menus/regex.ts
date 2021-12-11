import { SelectMenu, ShewenyClient } from '../../../../';
import type { SelectMenuInteraction } from 'discord.js';

export class Select extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, [/select-[0-9]{1,2}/]);
  }
  execute(selectMenu: SelectMenuInteraction) {
    selectMenu.reply('Regex work !');
  }
}
