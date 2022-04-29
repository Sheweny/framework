"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../../");
class Ready extends __1.Event {
    constructor(client) {
        super(client, 'cooldownLimit', {
            description: '',
            once: false,
            emitter: client.managers.buttons,
        });
    }
    async execute(interaction, cooldown) {
        interaction.reply(`You have reached the cooldown limit. Please wait ${cooldown / 1000} seconds before using this button again.`);
    }
}
exports.default = Ready;
