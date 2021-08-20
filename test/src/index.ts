import { ApplicationCommandHandler, ShewenyClient } from "../../";

const client = new ShewenyClient({
  intents: ["GUILDS"],
  handlers: {
    applicationCommands: {
      directory: "./commands",
    },
  },
});

new ApplicationCommandHandler(client)
  .registerCommands(client.applicationCommands, "877090306103840778")
  .then(() => console.log("Commands loaded"));

client.login("ODc3NDI2MDMxMjMxOTAxNzQ2.YRycqw.xSvG2o0kY0dAf3mE58crG0wAgB8");
