import { ShewenyClient } from "../..";

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  handlers: {
    commands: {
      directory: "./commands",
      guildId: "877090306103840778",
      prefix: "!",
      applicationPermissions: true,
    },
    events: {
      directory: "./events",
    },
  },
  joinThreadsOnCreate: true,
});

client.login("");

client.handlers.commands.on("cooldownLimit", (interaction: any) => {
  interaction.reply({ content: "Slow down", ephemeral: true });
});
