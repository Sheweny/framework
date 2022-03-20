"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../../");
class Ready extends __1.Event {
    constructor(client) {
        super(client, 'warning', {
            emitter: process,
        });
    }
    execute(ctx) {
        console.log('Woops... An warning occured :');
        console.log(ctx);
    }
}
exports.default = Ready;
