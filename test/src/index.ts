import { ShewenyClient, ApplicationCommandHandler } from "../../";

const client = new ShewenyClient({
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

const applicationHandler = new ApplicationCommandHandler(client, "./commands");

applicationHandler.registerAll().then(() => {
  applicationHandler.registerCommands(client.commands.interaction, "877090306103840778");
});

client.login("ODc3NDI2MDMxMjMxOTAxNzQ2.YRycqw.xSvG2o0kY0dAf3mE58crG0wAgB8");
