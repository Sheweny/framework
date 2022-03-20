"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const __1 = require("../../../..");
class PingCommand extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'arguments',
            description: 'Test arguments',
            type: 'MESSAGE_COMMAND',
            category: 'Misc',
            args: [
                {
                    name: 'user',
                    type: 'USER',
                },
                {
                    name: 'member',
                    type: 'MEMBER',
                },
                {
                    name: 'channel',
                    type: 'CHANNEL',
                },
                {
                    name: 'emoji',
                    type: 'GUILD_EMOJI',
                },
                {
                    name: 'role',
                    type: 'ROLE',
                },
                {
                    name: 'guild',
                    type: 'GUILD',
                },
            ],
        });
    }
    execute(message, args) {
        console.log(args);
    }
}
exports.PingCommand = PingCommand;
