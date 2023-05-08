import { Project } from "./commands/create/index.js";
import { Component } from "./commands/add/index.js";
import { Init } from "./commands/init/index.js";
import { getVersion } from "./commands/version/index.js";
import { help } from "./commands/help/index.js";
import { getArgs } from "./utils/getArgs.js";
import chalk from "chalk";
export async function cli(args: string[]): Promise<void> {
  const majorVersion = parseInt(process.version.split(".")[0] || "0");
  const minorVersion = parseInt(process.version.split(".")[1] || "");

  if (majorVersion < 16) {
    console.log(`${chalk.red.bold("ERROR")} You must have nodejs 16.6.0 or higher for use discord.js V13 `);
    process.exit(1);
  } else if (majorVersion == 16 && minorVersion < 6) {
    console.log(`${chalk.red.bold("ERROR")} You must have nodejs 16.6.0 or higher for use discord.js V13 `);
    process.exit(1);
  }
  const options = await getArgs(args);
  switch (options.commandName) {
    case "help":
      await help(options);
      break;
    case "init":
      new Init();
      break;
    case "create":
      const project = new Project(options);
      const configCreate = await project.getConfig();
      await project.create(configCreate);
      break;
    case "add":
      const component = new Component(options);
      await component.init();
      const configComponent = await component.getConfig();
      await component.create(configComponent);
      break;
    case "version":
      console.log("Sheweny CLI:", getVersion());
      break;
    default:
      help(options);
      break;
  }
}
