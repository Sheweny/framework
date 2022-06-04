const { ShewenyClient } = require('sheweny');
const { GatewayIntentBits } = require('discord.js');
const config = require('../config-test.json');
const client = new ShewenyClient({
  intents: [GatewayIntentBits.Guilds],
  managers: {
    commands: {
      directory: './commands',
      guildId: '877090306103840778',
      autoRegisterApplicationCommands: true,
      prefix: '!',
    },
  },
  mode: 'development',
});
client.login(config.token);
