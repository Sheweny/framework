"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvatar = void 0;
const __1 = require("../../../../");
class GetAvatar extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'display-avatar',
            type: 'CONTEXT_MENU_USER',
            category: 'Misc',
            description: 'Get avatar of user',
            cooldown: 10,
        });
    }
    execute(interaction) {
        return interaction.reply({
            content: interaction.options.getUser('user')?.displayAvatarURL(),
        });
    }
}
exports.GetAvatar = GetAvatar;