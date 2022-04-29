"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvatar = void 0;
const __1 = require("../../../../");
const discord_js_1 = require("discord.js");
class GetAvatar extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'send-embed',
            type: 'CONTEXT_MENU_MESSAGE',
            category: 'Misc',
            description: 'Get avatar of user',
            cooldown: 10,
        });
    }
    async execute(interaction) {
        const message = await interaction.channel.messages.fetch(interaction.targetId);
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({ iconURL: message.author.displayAvatarURL(), name: message.author.tag })
            .setDescription(message.content)
            .setColor(111111)
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
    }
}
exports.GetAvatar = GetAvatar;
