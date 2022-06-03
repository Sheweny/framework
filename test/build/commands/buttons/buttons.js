"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
class PingCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'buttons',
            description: 'Test the buttons',
            type: 'SLASH_COMMAND',
            category: 'Misc',
        });
    }
    execute(interaction) {
        const row = new discord_js_1.ActionRowBuilder().addComponents([
            new discord_js_1.ButtonBuilder().setCustomId('primary').setLabel('Primary').setStyle(discord_js_1.ButtonStyle.Primary),
            new discord_js_1.ButtonBuilder().setCustomId('secondary').setLabel('Secondary').setStyle(discord_js_1.ButtonStyle.Secondary),
            new discord_js_1.ButtonBuilder().setCustomId('success').setLabel('Success').setStyle(discord_js_1.ButtonStyle.Success),
            new discord_js_1.ButtonBuilder().setCustomId('danger').setLabel('Danger').setStyle(discord_js_1.ButtonStyle.Danger),
        ]);
        interaction.reply({ content: 'Test the buttons', components: [row] });
    }
}
exports.default = PingCommand;
