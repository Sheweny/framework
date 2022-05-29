"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const __1 = require("../../../");
class PingCommand extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'permissions',
            description: 'Ping the bot',
            type: 'SLASH_COMMAND',
            category: 'Misc',
            userPermissions: ['ManageMessages'],
        });
    }
    execute(interaction) {
        interaction.reply('You have MANAGE_MESSAGES permission.');
    }
}
exports.PingCommand = PingCommand;
