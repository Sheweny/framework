import chalk from "chalk";

export function createHelp() {
  console.log(`
${chalk.blue("Sheweny command line interface : create")}
  
${chalk.blue("Create a new discord bot project with sheweny framework")}.

${chalk.yellow("Usage:")}
${chalk.blue("sheweny")} create [project_name]

${chalk.yellow("Options:")}
[${chalk.grey("-y")}|${chalk.grey("--yes")}]
[${chalk.grey("-h")}|${chalk.grey("--help")}]`);
}
