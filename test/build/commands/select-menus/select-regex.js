"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
class PingCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'select-regex',
            description: 'Send buttons',
            type: 'SLASH_COMMAND',
            category: 'Tests',
        });
    }
    execute(interaction) {
        const row = new discord_js_2.ActionRowBuilder().addComponents([
            new discord_js_1.SelectMenuBuilder()
                .setCustomId('select-10')
                .setPlaceholder('Nothing selected')
                .setMaxValues(2)
                .addOptions([
                new discord_js_2.SelectMenuOptionBuilder().setLabel('First option').setDescription('The first option').setValue('first'),
                new discord_js_2.SelectMenuOptionBuilder().setLabel('Second option').setDescription('The second option').setValue('second'),
            ]),
        ]);
        interaction.reply({ content: 'Test the select-menus', components: [row] });
    }
}
exports.PingCommand = PingCommand;
