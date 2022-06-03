"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sheweny_1 = require("sheweny");
class Ready extends sheweny_1.Event {
    constructor(client) {
        super(client, 'ready', {
            description: 'Client is logged in',
            once: true,
            emitter: client,
        });
    }
    async execute(client) {
        console.log('The client is logged in');
        client.user?.setActivity('with Sheweny V4-dev !');
    }
}
exports.default = Ready;
