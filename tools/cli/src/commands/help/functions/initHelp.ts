import chalk from "chalk";

export function initHelp() {
  console.log(`
${chalk.blue("Sheweny command line interface : init")}
  
${chalk.blue("Initialize the cli for an existing project")}.    

${chalk.yellow("Usage:")}
${chalk.blue("sheweny")} init


${chalk.yellow("Options:")}
[${chalk.grey("-h")}|${chalk.grey("--help")}]`);
}
