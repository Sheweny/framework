import { ShewenyClient } from "../../../";
import { DiscordResolve } from "@discord-util/resolve";
import { CommandInteraction } from "discord.js";
const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  handlers: {
    applicationCommands: {
      directory: "./commands",
      guildId: "877090306103840778",
    },
    messageCommands: {
      directory: "./messageCommands",
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
declare module "../../../" {
  interface ShewenyClient {
    resolve?: DiscordResolve;
  }
}
const resolve = new DiscordResolve(client);
client.resolve = resolve;
client.login("Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.f5UlYbqi_kxXCV9t6Z-VB3t9_WY");

client.handlers.applicationCommands?.on(
  "userMissingPermissions",
  (interaction: CommandInteraction, missing: string) => {
    interaction.reply(
      `You dont have permissions for execute this command. You need ${missing} permission`
    );
  }
);
