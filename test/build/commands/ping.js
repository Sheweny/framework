"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const sheweny_1 = require("sheweny");
class PingCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Ping !',
            type: 'SLASH_COMMAND',
            channel: 'DM',
        });
    }
    execute(interaction) {
        interaction.reply('Pong !');
    }
}
exports.PingCommand = PingCommand;
