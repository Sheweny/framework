"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sheweny_1 = require("sheweny");
class Ready extends sheweny_1.Event {
    constructor(client) {
        super(client, 'rejectionHandled', {
            emitter: process,
        });
    }
    execute(ctx) {
        console.log('Woops... An rejectionHandled error occured :');
        console.log(ctx);
    }
}
exports.default = Ready;
