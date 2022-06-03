"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const sheweny_1 = require("sheweny");
class Select extends sheweny_1.SelectMenu {
    constructor(client) {
        super(client, [/select-[0-9]{1,2}/]);
    }
    execute(selectMenu) {
        selectMenu.reply('Regex work !');
    }
}
exports.Select = Select;
