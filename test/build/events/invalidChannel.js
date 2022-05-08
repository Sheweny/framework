"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../");
class InvalidChannel extends __1.Event {
    constructor(client) {
        super(client, 'invalidChannel', {
            description: 'Invalid command channel',
            once: false,
            emitter: client.managers.commands,
        });
    }
    async execute(command, ctx) {
        ctx.reply("Vous ne vouvez pas utiliser la commande " + command.name + " dans ce type de channel.");
    }
}
exports.default = InvalidChannel;
