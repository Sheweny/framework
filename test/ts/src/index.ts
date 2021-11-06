import { ShewenyClient } from '../../../';
import config from './config-test.json';
const client = new ShewenyClient({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
  handlers: {
    commands: {
      directory: './commands',
      guildId: '877090306103840778',
    },

    buttons: {
      directory: './interactions/buttons',
    },
    selectMenus: {
      directory: './interactions/select-menus',
    },
    events: {
      directory: './events',
    },
    inhibitors: {
      directory: './inhibitors',
    },
  },
});

client.login(config.token);
//@ts-ignore
new Promise((resolve, reject) => {
  setTimeout(() => reject('woops'), 500);
});
