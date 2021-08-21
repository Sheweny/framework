import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import { IMessageCommandHandlerOptions } from "../typescript/interfaces/interfaces";
import { ShewenyClient } from "../ShewenyClient";
import { MessageCommand } from "../structures";
import { EventEmitter } from "events";
import type { Client } from "discord.js";

/**
 * Loads commands.
 * @class Commands Handler
 */
export class MessageCommandsHandler extends EventEmitter {
  private client?: ShewenyClient | Client;
  private dir: string;
  options: IMessageCommandHandlerOptions;

  /**
   * @constructor
   * @param {IMessageCommandHandlerOptions} options - The options for the commands handler
   * @param {ShewenyClient} [client] - The client
   */
  constructor(
    options: IMessageCommandHandlerOptions,
    client?: ShewenyClient | Client,
    loadAll?: boolean
  ) {
    super();
    if (!options.directory) throw new TypeError("Directory must be provided.");
    this.dir = options.directory;
    if (client) this.client = client;
    this.options = options;
    if (loadAll) this.loadAll();
    if (client && client instanceof ShewenyClient) client.handlers.messageCommands = this;
  }

  /**
   * Load all commands and register them to a collection.
   * @public
   * @async
   * @returns {Promise<Collection<string, MessageCommand>>} The collection of commands
   */
  public async loadAll(): Promise<Collection<string, MessageCommand>> {
    const commands: Collection<string, MessageCommand> = new Collection();
    const baseDir = join(require.main!.path, this.dir);
    const cmds: string[] = await readDirAndPush(baseDir);
    for (const cmdPath of cmds) {
      const commandImport = await import(cmdPath);
      const key = Object.keys(commandImport)[0];
      const Command = commandImport[key];
      if (!Command) continue;
      const instance: MessageCommand = new Command(this.client);
      if (!instance.name) continue;
      instance.path = cmdPath;
      commands.set(instance.name, instance);
    }
    if (this.client instanceof ShewenyClient) this.client.commands.message = commands;
    return commands;
  }
}
