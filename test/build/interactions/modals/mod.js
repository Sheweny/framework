"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mod = void 0;
const __1 = require("../../../../");
class Mod extends __1.Modal {
    constructor(client) {
        super(client, ['AwesomeForm']);
    }
    async execute(modal) {
        modal.reply('Modal received !');
    }
}
exports.Mod = Mod;
