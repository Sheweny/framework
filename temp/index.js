const { ShewenyClient, Constants } = require('../');
const config = require('../test/config-test.json');
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
    },
  },
});

client.login(config.token);
