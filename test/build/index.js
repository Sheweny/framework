"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const resolve_1 = require("@discord-util/resolve");
const client = new __1.ShewenyClient({
    intents: ["GUILDS"],
    handlers: {
        applicationCommands: {
            directory: "./commands",
            guildId: "877090306103840778",
        },
        buttons: {
            directory: "./interactions/buttons",
        },
        selectMenus: {
            directory: "./interactions/select-menus",
        },
    },
});
const resolve = new resolve_1.DiscordResolve(client);
client.resolve = resolve;
client.login("ODc3NDI2MDMxMjMxOTAxNzQ2.YRycqw.xSvG2o0kY0dAf3mE58crG0wAgB8");
client.handlers.applicationCommands?.on("userMissingPermissions", (interaction, missing) => {
    interaction.reply(`You dont have permissions for execute this command. You need ${missing} permission`);
});
