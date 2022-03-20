"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../");
class Ready extends __1.Event {
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
