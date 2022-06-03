"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Btns = void 0;
const sheweny_1 = require("sheweny");
class Btns extends sheweny_1.Button {
    constructor(client) {
        super(client, [/sheweny-[0-9]{1,2}/]);
    }
    async execute(button) {
        button.reply('Regex work (Sheweny 3.1.0)');
    }
}
exports.Btns = Btns;
