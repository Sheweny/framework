"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sheweny_1 = require("sheweny");
class Ready extends sheweny_1.Event {
    constructor(client) {
        super(client, 'messageCreate', {
            description: 'A message is created',
        });
    }
    execute(client) {
        console.log('Message created');
    }
}
exports.default = Ready;
