import { ShewenyClient } from '../../';
const config = require('../config-test.json');
const client = new ShewenyClient({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
  mode: 'development',
  managers: {
    commands: {
      directory: './commands',
      prefix: '!',
      guildId: ['877090306103840778', '809702809196560405'],
      autoRegisterApplicationCommands: true,
      loadAll: true,
    },

    buttons: {
      directory: './interactions/buttons',
      loadAll: true,
    },
    selectMenus: {
      directory: './interactions/select-menus',
      loadAll: true,
    },
    events: {
      directory: './events',
      loadAll: true,
    },
    inhibitors: {
      directory: './inhibitors',
      loadAll: true,
    },
  },
});

client.login(config.token);
