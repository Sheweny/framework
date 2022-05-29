"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../");
class Ready extends __1.Event {
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
