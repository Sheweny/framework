"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const __1 = require("../../../../");
class PingCommand extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'msg',
            description: 'Test message command',
            type: 'MESSAGE_COMMAND',
            category: 'Test',
        });
    }
    execute(msg) {
        msg.reply('Message commands work with V3 !');
    }
}
exports.PingCommand = PingCommand;
