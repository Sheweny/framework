import { CommandsManager, ShewenyClient } from "../..";

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  handlers: {
    events: {
      directory: "./events",
    },
  },
});

client.login("");

new CommandsManager(client, "./commands", {
  guildId: "877090306103840778",
  loadAll: true,
});
