"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const __1 = require("../../../");
class PingCommand extends __1.Command {
    constructor(client) {
        super(client, 'ping', {
            description: 'Ping the bot',
            category: 'Misc'
        });
    }
    execute(interaction) {
        interaction.reply('Pong !');
    }
}
exports.PingCommand = PingCommand;
