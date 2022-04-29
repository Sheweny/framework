"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const __1 = require("../../../../");
const discord_js_1 = require("discord.js");
class PingCommand extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'select-menus',
            description: 'Send buttons',
            type: 'SLASH_COMMAND',
            category: 'Tests',
        });
    }
    execute(interaction) {
        const row = new discord_js_1.ActionRowBuilderBuilder().addComponents(new discord_js_1.SelectMenuComponent()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions(new discord_js_1.UnsafeSelectMenuOption().setLabel('First option').setDescription('The first option').setValue('first'), new discord_js_1.UnsafeSelectMenuOption().setLabel('Second option').setDescription('The second option').setValue('second')));
        interaction.reply({ content: 'Test the select-menus', components: [row] });
    }
}
exports.PingCommand = PingCommand;
