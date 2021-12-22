import { ShewenyClient, Constants } from '../../';
const config = require('../config-test.json');
const client = new ShewenyClient({
  intents: Constants.CLIENT_UTIL.allIntents,
  partials: Constants.CLIENT_UTIL.allPartials,
  admins: ['611468402263064577'],
  mode: 'development',
  managers: {
    commands: {
      directory: './commands',
      prefix: '?',
      guildId: ['877090306103840778', '809702809196560405'],
      autoRegisterApplicationCommands: true,
      applicationPermissions: true,
      loadAll: true,
      default: {
        adminOnly: false,
        category: 'Default category',
        channel: 'GUILD',
        clientPermissions: [],
        cooldown: 3.5,
        examples: ['Example 1', 'Example 2'],
        type: 'SLASH_COMMAND',
        usage: '?command',
        userPermissions: [],
      },
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
