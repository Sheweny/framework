import { ShewenyClient, CommandsHandler, ButtonsHandler } from "../../";

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
  partials: ["CHANNEL"],
});

const commandsHandler = new CommandsHandler(
  {
    type: "SLASH_COMMANDS",
    directory: "./commands",
  },
  client
);
commandsHandler.loadAll().then(async () => {
  await commandsHandler.slashCommands!.registerCommands(
    client.commands,
    "877090306103840778"
  );
});

const buttonsHandler = new ButtonsHandler("./buttons", client);
buttonsHandler.registerAll();

client.handlers.commands = commandsHandler;

client.login("Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.lQJCcOLtXNiU5vQ7VMZXQI8mGf4");
