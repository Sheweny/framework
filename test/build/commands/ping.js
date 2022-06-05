"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping2Command = exports.PingCommand = void 0;
const sheweny_1 = require("sheweny");
class PingCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Ping !',
            type: 'SLASH_COMMAND',
        });
    }
    execute(interaction) {
        interaction.reply('Pong !');
    }
}
exports.PingCommand = PingCommand;
class Ping2Command extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'ping2',
            description: 'Ping ! (two commands in same file)',
            type: 'SLASH_COMMAND',
        });
    }
    execute(interaction) {
        interaction.reply('Pong 2 !');
    }
}
exports.Ping2Command = Ping2Command;
