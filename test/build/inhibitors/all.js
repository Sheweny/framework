"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackListInhibitor = void 0;
const sheweny_1 = require("sheweny");
class BlackListInhibitor extends sheweny_1.Inhibitor {
    constructor(client) {
        super(client, 'blacklist', {
            type: ['BUTTON'],
        });
    }
    execute(client, ctx) {
        console.log('Inhibitor called');
        return !['809702809196560405'].includes(ctx.guildId);
    }
    onFailure(client, interaction) {
        if (interaction.isCommand() || interaction.isContextMenuCommand() || interaction.isButton() || interaction.isSelectMenu())
            interaction.reply('Your guild is blacklisted.');
    }
}
exports.BlackListInhibitor = BlackListInhibitor;
