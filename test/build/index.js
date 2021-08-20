"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const client = new __1.ShewenyClient({
    intents: ["GUILDS"],
    handlers: {
    // applicationCommands: {
    //   directory: "./commands",
    //   options: {
    //     guildId: "877090306103840778",
    //   },
    // }, // Add options
    },
});
const applicationHandler = new __1.ApplicationCommandHandler(client, "./commands");
applicationHandler.loadAll().then(() => {
    applicationHandler.registerCommands(client.commands.interaction, "877090306103840778");
});
client.login("ODc3NDI2MDMxMjMxOTAxNzQ2.YRycqw.xSvG2o0kY0dAf3mE58crG0wAgB8");
