import arg from "arg";
import { ICommand } from "../typescript/interfaces/interfaces";

export async function getArgs(rawArgs: string[]): Promise<ICommand> {
  const args = arg(
    {
      "--yes": Boolean,
      "--help": Boolean,
      "--version": Boolean,
      "-y": "--yes",
      "-h": "--help",
      "-v": "--version",
    },
    {
      argv: rawArgs.slice(1),
    }
  );

  if (args["--help"])
    return {
      commandName: "help",
      arguments: args._.slice(1),
      skipPrompts: false,
    };
  if (args["--version"])
    return {
      commandName: "version",
      arguments: args._.slice(1),
      skipPrompts: false,
    };

  const commandName: "create" | "add" | "help" | "version" | undefined = args._[1]
    ? (args._[1].toLowerCase() as "create" | "add" | "help" | "version")
    : undefined;

  return {
    commandName,
    skipPrompts: args["--yes"] || false,
    arguments: args._.slice(2),
  };
}
