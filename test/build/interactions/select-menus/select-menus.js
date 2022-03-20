"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const __1 = require("../../../../");
class Select extends __1.SelectMenu {
    constructor(client) {
        super(client, ['select']);
    }
    execute(selectMenu) {
        switch (selectMenu.values[0]) {
            case 'first_option':
                selectMenu.reply('You have choose first option selectMenu !');
                break;
            case 'second_option':
                selectMenu.reply('You have choose on second option !');
                break;
        }
    }
}
exports.Select = Select;
