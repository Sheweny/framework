import { ShewenyClient } from "../..";

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  handlers: {
    commands: {
      directory: "./commands",
      guildId: "877090306103840778",
      prefix: "!",
    },
    events: {
      directory: "./events",
    },
  },
});

client.login("Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.TVq5BQ9lM6tEDR1pznn2NBCK0NE");

client.handlers.commands.on("cooldownLimit", (interaction: any) => {
  interaction.reply({ content: "Slow down", ephemeral: true });
});
