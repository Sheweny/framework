import { join } from "path";
import { Collection } from "collection-data";
import { SlashHandler } from ".";
import { readDirAndPush } from "../util/readDirFiles";
import type {
  Command,
  ICommandHandlerOptions,
} from "../typescript/interfaces/interfaces";
import type { ShewenyClient } from "..";

/**
 * Loads commands.
 * @class
 */
export class CommandsHandler {
  private client: ShewenyClient | undefined;
  private dir: string;
  public slashCommands: SlashHandler | undefined;
  options: ICommandHandlerOptions;

  /**
   * @param {ICommandHandlerOptions} options - The options for the commands handler
   * @param {ShewenyClient} [client] - The client
   */
  constructor(options: ICommandHandlerOptions, client?: ShewenyClient) {
    if (!options.directory) throw new TypeError("Directory must be provided.");
    if (options.type && !["MESSAGE_COMMANDS", "SLASH_COMMANDS"].includes(options.type))
      throw new TypeError(
        `Unknown type of command: ${options.type} \nThe type must be MESSAGE_COMMANDS or SLASH_COMMANDS`
      );
    if (!options.type) options.type = "MESSAGE_COMMANDS";
    this.dir = options.directory;
    if (client) {
      this.client = client;
      this.client!.commandsType = options.type;
    }
    this.options = options;
  }

  /**
   * Load all commands and register them to a collection.
   * @returns {Promise<Collection<string, Command>>} The collection of commands
   */
  public async loadAll(): Promise<Collection<string, Command>> {
    const commands: Collection<string, Command> = new Collection();
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
      commands.set(instance.name, instance);
    }
    if (this.client) {
      this.client.commands = commands;
      if (this.options.type === "SLASH_COMMANDS") {
        this.slashCommands = new SlashHandler(this.client);
      }
    }
    return commands;
  }
}
