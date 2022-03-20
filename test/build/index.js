"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const discord_js_1 = require("discord.js");
const config = require('../config-test.json');
const client = new __1.ShewenyClient({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.DirectMessages,
        discord_js_1.IntentsBitField.Flags.DirectMessageReactions,
    ],
    partials: [discord_js_1.Partials.Channel, discord_js_1.Partials.Message, discord_js_1.Partials.Reaction, discord_js_1.Partials.User, discord_js_1.Partials.GuildMember],
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
