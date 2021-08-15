"use strict";
const { ShewenyClient } = require('../../../build');
const client = new ShewenyClient({
    intents: ['GUILDS', 'GUILD_MESSAGES'],
    handlers: {
        commands: {
            directory: "./commands",
            type: "SLASH_COMMANDS"
        }
    }
});
client.handlers.commands.loadAll().then(() => {
    client.handlers.commands.slashCommands.registerCommands(client.commands, "809702809196560405");
});
client.login('Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.Q7U_VPFx_9T0Qb_mDh1Qd6fv88w');
