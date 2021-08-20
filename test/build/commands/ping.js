"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
const __1 = require("../../../");
class Ping extends __1.ApplicationCommand {
    constructor(client) {
        super(client, {
            name: "ping-1851",
            description: "Ping Pong",
        }, { category: "test" });
    }
    execute(interaction) {
        return interaction.reply({ content: "PONG" });
    }
}
exports.Ping = Ping;
