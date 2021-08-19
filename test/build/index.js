"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const client = new __1.ShewenyClient({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    partials: ["CHANNEL"],
});
const commandsHandler = new __1.CommandsHandler({
    type: "SLASH_COMMANDS",
    directory: "./commands",
}, client);
commandsHandler.loadAll().then(async () => {
    await commandsHandler.slashCommands.registerCommands(client.commands, "877090306103840778");
});
const buttonsHandler = new __1.ButtonsHandler("./buttons", client);
buttonsHandler.registerAll();
client.handlers.commands = commandsHandler;
client.login("Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.lQJCcOLtXNiU5vQ7VMZXQI8mGf4");
