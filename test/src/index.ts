import { ShewenyClient } from "../..";

const client = new ShewenyClient({
  intents: ["GUILDS"],
  handlers: {
    commands: {
      directory: "./commands",
      type: "applications",
      guildId: "877090306103840778",
    },
    events: {
      directory: "./events",
    },
  },
});

client.login("");

client.handlers.commands.on("cooldownLimit", (interaction) => {
  interaction.reply({ content: "Slow down", ephemeral: true });
});
