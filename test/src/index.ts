import { ShewenyClient } from 'sheweny';
import { IntentsBitField, Partials } from 'discord.js';
import { readFileSync } from 'fs';

const configFile = readFileSync("../config-test.json").toString();
const config = JSON.parse(configFile);
const client = new ShewenyClient({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction, Partials.User, Partials.GuildMember],
  admins: ['611468402263064577'],
  mode: 'development',
  managers: {
    commands: {
      directory: './commands',
      prefix: '?',
      guildId: ['877090306103840778', '809702809196560405'],
      autoRegisterApplicationCommands: true,
      applicationPermissions: false,
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
      default: {
        once: false,
      },
    },
    modals: {
      directory: './interactions/modals',
      loadAll: true,
    },
    inhibitors: {
      directory: './inhibitors',
      loadAll: true,
      default: {
        type: ['MESSAGE_COMMAND'],
        priority: 15,
      },
    },
  },
});

client.login(config.token);
