"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalCmd = void 0;
const __1 = require("../../../../");
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
class ModalCmd extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'modal',
            description: 'Test modals',
            type: 'SLASH_COMMAND',
        });
    }
    async execute(interaction) {
        // Create the modal
        const modal = new discord_js_2.ModalBuilder().setTitle('My Awesome Form').setCustomId('AwesomeForm');
        // Create text input fields
        const tvShowInputComponent = new discord_js_2.TextInputBuilder()
            .setCustomId('tsField')
            .setLabel('Favorite TV show')
            .setStyle(discord_js_2.TextInputStyle.Short);
        const haikuInputComponent = new discord_js_2.TextInputBuilder()
            .setCustomId('haikuField')
            .setLabel('Write down your favorite haiku')
            .setStyle(discord_js_2.TextInputStyle.Paragraph);
        const rows = [];
        for (const component of [tvShowInputComponent, haikuInputComponent]) {
            rows.push(new discord_js_1.ActionRowBuilder().addComponents([component]));
        }
        // Add action rows to form
        modal.addComponents(rows);
        await interaction.showModal(modal);
    }
}
exports.ModalCmd = ModalCmd;
