"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const client = new __1.ShewenyClient({ intents: ["GUILDS", 'GUILD_MESSAGES'] });
const commandsHandler = new __1.CommandsHandler(client, {
    type: 'MESSAGE_COMMANDS',
    directory: './commands'
});
commandsHandler.loadAll();
// .then(async () => {
// 	await commandsHandler.slashCommands!.registerCommands(client.commands, '809702809196560405')
// })
client.handlers.commands = commandsHandler;
client.login('');
