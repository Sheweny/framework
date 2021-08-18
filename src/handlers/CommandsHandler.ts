import { join } from "path";
import { SlashHandler } from "../index";
import { readDirAndPush } from "../util/readDirFiles";
import type { ICommandHandlerOptions } from "../typescript/interfaces/interfaces";
import type { ShewenyClient } from "../index";

/**
 * Loads commands.
 * @class
 */
export class CommandsHandler {
  private client: ShewenyClient;
  private dir: string;
  public slashCommands: SlashHandler | undefined;
  options: ICommandHandlerOptions;

  /**
   * @param {ShewenyClient} client - The client
   * @param {ICommandHandlerOptions} options - The options for the commands handler
   */
  constructor(client: ShewenyClient, options: ICommandHandlerOptions) {
    if (!options.directory) throw new TypeError("Directory must be provided.");
    if (options.type && !["MESSAGE_COMMANDS", "SLASH_COMMANDS"].includes(options.type))
      throw new TypeError(
        "Unknown type of command: " +
          options.type +
          "\nThe type must be MESSAGE_COMMANDS or SLASH_COMMANDS"
      );
    if (!options.type) options.type = "MESSAGE_COMMANDS";
    this.client = client;
    this.dir = options.directory;
    this.client.commandsType = options.type;
    this.options = options;
  }
  /**
   * @returns {Collection<string, Command>} The collection of commands
   */
  async loadAll() {
    const baseDir = join(require.main!.path, this.dir);
    const cmds: string[] = await readDirAndPush(baseDir);
    for (const cmdPath of cmds) {
      const commandImport = await import(cmdPath);
      const key = Object.keys(commandImport)[0];
      const Command = commandImport[key];

      if (!Command) continue;
      const instance = new Command(this.client);

      if (!instance.name) continue;
      instance.path = cmdPath;
      this.client.commands.set(instance.name, instance);
    }
    if (this.options.type === "SLASH_COMMANDS") {
      this.slashCommands = new SlashHandler(this.client);
    }
    return this.client.commands;
  }
}
