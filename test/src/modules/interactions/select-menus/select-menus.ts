import { SelectMenu, ShewenyClient } from 'sheweny';
import type { SelectMenuInteraction } from 'discord.js';

export class Select extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ['select']);
  }
  execute(selectMenu: SelectMenuInteraction) {
    switch (selectMenu.values[0]) {
      case 'option-1':
        selectMenu.reply('The first option');
        break;
      case 'option-2':
        selectMenu.reply('The second option');
        break;
    }
  }
}
