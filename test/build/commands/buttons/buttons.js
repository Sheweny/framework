"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../..");
const discord_js_1 = require("discord.js");
class PingCommand extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'buttons',
            description: 'Test the buttons',
            type: 'SLASH_COMMAND',
            category: 'Misc',
        });
    }
    execute(interaction) {
        const row = new discord_js_1.ActionRow()
            .addComponents(new discord_js_1.ButtonComponent().setCustomId('primary').setLabel('Primary').setStyle(discord_js_1.EnumResolvers.resolveButtonStyle('PRIMARY')))
            .addComponents(new discord_js_1.ButtonComponent()
            .setCustomId('secondary')
            .setLabel('Secondary')
            .setStyle(discord_js_1.EnumResolvers.resolveButtonStyle('SECONDARY')))
            .addComponents(new discord_js_1.ButtonComponent().setCustomId('success').setLabel('Success').setStyle(discord_js_1.EnumResolvers.resolveButtonStyle('SUCCESS')))
            .addComponents(new discord_js_1.ButtonComponent().setCustomId('danger').setLabel('Danger').setStyle(discord_js_1.EnumResolvers.resolveButtonStyle('DANGER')));
        interaction.reply({ content: 'Test the buttons', components: [row] });
    }
}
exports.default = PingCommand;
