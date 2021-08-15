"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../..");
class Ping extends __1.Command {
    constructor(client) {
        super(client, 'pingsss', {
            aliases: [],
            options: [],
            description: 'Get ping of the bot',
            category: 'Other',
            cooldown: 5,
            userPermissions: [],
            botPermissions: [],
            subCommands: [],
        });
    }
    async execute(interaction) {
        const debut = Date.now();
        interaction.reply('Pong !')
            .then(async () => await interaction.editReply(`Pong  BOT : \`${Date.now() - debut}ms\` API : \`${this.client.ws?.ping}ms\``));
    }
}
exports.default = Ping;
