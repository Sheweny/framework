import { ShewenyClient } from "../..";

const client = new ShewenyClient({
  intents: ["GUILDS"],
  handlers: {
    commands: {
      directory: "./commands",
      type: "applications",
      guildId: "877090306103840778",
    },
  },
});

client.login("");
