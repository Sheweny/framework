import chalk from "chalk";

export function defaultHelp() {
  return console.log(`${chalk.blue(
    String.raw`
  ____   _                                        
 / ___| | |__    ___ __      __ ___  _ __   _   _ 
 \___ \ | '_ \  / _ \\ \ /\ / // _ \| '_ \ | | | |
  ___) || | | ||  __/ \ V  V /|  __/| | | || |_| |
 |____/ |_| |_| \___|  \_/\_/  \___||_| |_| \__, |
                                            |___/ 
`
  )}
${chalk.green("Welcome to the command line interface of Sheweny framework !xx")}

${chalk.yellow("Prefixes:")}
- ${chalk.blue("sheweny")}
- ${chalk.blue("shw")}

${chalk.yellow("Usage:")} 
- ${chalk.blue("sheweny")} <command> [options]

${chalk.yellow("Commands:")}
• ${chalk.blue("sheweny")} init                      ${chalk.white("• Initialize the CLI in an existing project")}
• ${chalk.blue("sheweny")} create [project_name]     ${chalk.white("• Create a new project")}
• ${chalk.blue("sheweny")} add <add_type>            ${chalk.white("• Add a new component to the project")}
• ${chalk.blue("sheweny")} help [argument]           ${chalk.white("• Display help for a specific command")}
• ${chalk.blue("sheweny")} version | --version | -v  ${chalk.white("• Display the version of the CLI")}

`);
}
