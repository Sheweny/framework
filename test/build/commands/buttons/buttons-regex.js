"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../..");
const discord_js_1 = require("discord.js");
class PingCommand extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'buttons-regex',
            description: 'Test the buttons with regex',
            type: 'SLASH_COMMAND',
            category: 'Misc',
        });
    }
    execute(interaction) {
        const row = new discord_js_1.ActionRowBuilderBuilder()
            .addComponents(new discord_js_1.ButtonBuilder().setCustomId('sheweny-1').setLabel('Button').setStyle(discord_js_1.EnumResolvers.resolveButtonStyle('SUCCESS')))
            .addComponents(new discord_js_1.ButtonBuilder().setCustomId('sheweny-56').setLabel('Button').setStyle(discord_js_1.EnumResolvers.resolveButtonStyle('SUCCESS')))
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('sheweny-a')
            .setLabel('Button (not work)')
            .setStyle(discord_js_1.EnumResolvers.resolveButtonStyle('DANGER')))
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('sheweny-ab')
            .setLabel('Button (not work)')
            .setStyle(discord_js_1.EnumResolvers.resolveButtonStyle('DANGER')));
        interaction.reply({ content: 'Test the buttons with regex', components: [row] });
    }
}
exports.default = PingCommand;
