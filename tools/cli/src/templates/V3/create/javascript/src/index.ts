import { ICreateOptions } from "../../../../../typescript/interfaces/interfaces";

export default (options: ICreateOptions) => {
  function handlers() {
    let result = "";

    if (options.handlers!.length > 0)
      result += `
  managers: {`;
    if (options.handlers!.includes("commands")) {
      result += `
    commands: {
      directory: "./commands",
      autoRegisterApplicationCommands: true,
      prefix: "!",
    },`;
    }
    if (options.handlers!.includes("events"))
      result += `
    events: {
      directory: "./events",
    },`;
    if (options.handlers!.includes("buttons"))
      result += `
    buttons: {
      directory: "./interactions/buttons",
    },`;
    if (options.handlers!.includes("selectmenus"))
      result += `
    selectMenus: {
      directory: "./interactions/selectmenus",
    },`;
    if (options.handlers!.includes("inhibitors"))
      result += `
    inhibitors: {
      directory: "./inhibitors",
    },`;
    if (options.handlers!.length > 0)
      result += `
  },`;

    return result;
  }

  return [
    `const { ShewenyClient } = require("sheweny");
const config = require("../config${options.configFileType === "json" ? ".json" : ""}");

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],${handlers()}
  mode : "development", // Change to production for production bot
});

client.login(config.DISCORD_TOKEN);
`,
    "index.js",
  ];
};
