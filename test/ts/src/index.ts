import { ShewenyClient } from "../../../";
const config = require("../config-test.json");
const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  handlers: {
    commands: {
      directory: "./commands",
      guildId: "877090306103840778",
      prefix: "!",
    },
    buttons: {
      directory: "./interactions/buttons",
    },
    selectMenus: {
      directory: "./interactions/select-menus",
    },
    events: {
      directory: "./events",
    },
    inhibitors: {
      directory: "./inhibitors",
    },
  },
});

client.login(config.token);

client.handlers.commands?.on(
  "userMissingPermissions",
  (interaction: any, missing: string) => {
    interaction.reply(
      `You dont have permissions for execute this command. You need ${missing} permission`
    );
  }
);
