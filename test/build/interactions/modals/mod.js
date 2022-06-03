"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mod = void 0;
const sheweny_1 = require("sheweny");
class Mod extends sheweny_1.Modal {
    constructor(client) {
        super(client, ['AwesomeForm']);
    }
    async execute(modal) {
        modal.reply('Modal received !');
    }
}
exports.Mod = Mod;
