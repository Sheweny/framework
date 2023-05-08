import chalk from "chalk";

export function addHelp() {
  console.log(`
${chalk.blue("Sheweny command line interface : add")}
  
${chalk.blue("Add a new component to your discord bot (event or button etc...)")}.    

${chalk.yellow("Usage:")}
${chalk.blue("sheweny")} add <add_type>

${chalk.yellow("Add types:")}
- command
- event
- button
- selectmenu
- inhibitor

${chalk.yellow("Options:")}
[${chalk.grey("-y")}|${chalk.grey("--yes")}]
[${chalk.grey("-h")}|${chalk.grey("--help")}]`);
}
