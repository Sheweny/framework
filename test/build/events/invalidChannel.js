"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sheweny_1 = require("sheweny");
class InvalidChannel extends sheweny_1.Event {
    constructor(client) {
        super(client, 'invalidChannel', {
            description: 'Invalid command channel',
            once: false,
            emitter: client.managers.commands,
        });
    }
    async execute(command, ctx) {
        ctx.reply('Vous ne vouvez pas utiliser la commande ' + command.name + ' dans ce type de channel.');
    }
}
exports.default = InvalidChannel;
