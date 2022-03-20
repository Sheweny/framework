"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Btns = void 0;
const __1 = require("../../../../");
class Btns extends __1.Button {
    constructor(client) {
        super(client, ['primary', 'secondary', 'success', 'danger']);
    }
    async execute(button) {
        switch (button.customId) {
            case 'primary':
                button.reply('You have clicked on primary button !');
                break;
            case 'secondary':
                button.reply('You have clicked on secondary button !');
                break;
            case 'success':
                button.reply('You have clicked on success button !');
                break;
            case 'danger':
                button.reply('You have clicked on danger button !');
                break;
        }
    }
}
exports.Btns = Btns;
