"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const __1 = require("../../../");
class PingCommand extends __1.ApplicationCommand {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Ping the bot",
        }, {
            category: "Misc",
            userPermissions: ["BOT_ADMIN"],
        });
    }
    execute(interaction) {
        interaction.reply("Pong !");
    }
}
exports.PingCommand = PingCommand;
