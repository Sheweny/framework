import { ShewenyClient, ButtonsManager, SelectMenusManager } from 'sheweny';
import { GatewayIntentBits, IntentsBitField, Partials } from 'discord.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const configFile = readFileSync(resolve(__dirname, '../config-test.json')).toString();
const config = JSON.parse(configFile);
const client = new ShewenyClient({
  intents: [
    IntentsBitField.Flags.Guilds,
    GatewayIntentBits.MessageContent,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction, Partials.User, Partials.GuildMember],
  admins: ['611468402263064577'],
  mode: 'development',
  managers: {
    commands: {
      directory: './',
      prefix: () => '?',
      // guildId: ['877090306103840778', '809702809196560405'],
      // autoRegisterApplicationCommands: true,
      applicationPermissions: true,
      default: {
        adminOnly: false,
        registerApplicationCommand: true,
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

    events: {
      directory: './modules',
      default: {
        once: false,
      },
    },
    modals: {
      directory: './modules',
    },
    inhibitors: {
      directory: './modules',
      default: {
        type: ['MESSAGE_COMMAND'],
        priority: 15,
      },
    },
  },
});

client.login(config.token);
