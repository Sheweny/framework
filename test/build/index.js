"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const client = new __1.ShewenyClient({ intents: ["GUILDS"] });
const commandsHandler = new __1.CommandsHandler(client, {
    type: 'SLASH_COMMANDS',
    directory: './commands'
});
commandsHandler.loadAll().then(async () => {
    await commandsHandler.slashCommands.registerCommands(client.commands, '809702809196560405');
});
client.login('Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.Q7U_VPFx_9T0Qb_mDh1Qd6fv88w');
