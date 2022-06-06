"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const configFile = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, '../config-test.json')).toString();
const config = JSON.parse(configFile);
const client = new sheweny_1.ShewenyClient({
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
            directory: './',
            prefix: '?',
            guildId: ['877090306103840778', '809702809196560405'],
            autoRegisterApplicationCommands: true,
            applicationPermissions: false,
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
            directory: './modules',
        },
        selectMenus: {
            directory: './modules',
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
