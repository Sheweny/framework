"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sheweny_1 = require("sheweny");
class Ready extends sheweny_1.Event {
    constructor(client) {
        super(client, 'userMissingPermissions', {
            description: 'Missing permissions',
            emitter: client.managers.commands,
        });
    }
    execute(i, permission) {
        i.reply('Missing permissions !');
    }
}
exports.default = Ready;
