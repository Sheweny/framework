"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const __1 = require("../../../../");
class Select extends __1.SelectMenu {
    constructor(client) {
        super(client, [/select-[0-9]{1,2}/]);
    }
    execute(selectMenu) {
        selectMenu.reply('Regex work !');
    }
}
exports.Select = Select;
