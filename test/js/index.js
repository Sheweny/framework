const { ShewenyClient } = require("../../typings");

const client = new ShewenyClient({
  intents: ["GUILDS"],
  mode: "development",
  handlers: {
    commands: {
      directory: "./commands",
      guildId: "877090306103840778",
      loadAll: true,
    },
  },
});

client.login("");
