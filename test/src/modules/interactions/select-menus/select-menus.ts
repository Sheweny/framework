import { SelectMenu, ShewenyClient } from 'sheweny';
import type { SelectMenuInteraction } from 'discord.js';

export class Select extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ['select']);
  }
  execute(selectMenu: SelectMenuInteraction) {
    switch (selectMenu.values[0]) {
      case 'first_option':
        selectMenu.reply('You have choose first option selectMenu !');
        break;
      case 'second_option':
        selectMenu.reply('You have choose on second option !');
        break;
    }
  }
}
