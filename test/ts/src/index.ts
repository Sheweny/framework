import { CommandsManager, ShewenyClient } from "../../..";

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  mode: "development",
  handlers: {
    events: {
      directory: "./events",
    },
    buttons: {
      directory: "./buttons",
    },
  },
});

client.login("");

new CommandsManager(client, "./commands", {
  guildId: "877090306103840778",
  loadAll: true,
});
