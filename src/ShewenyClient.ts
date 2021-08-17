import { readdirSync } from "fs";
import { join } from "path";
import { Client } from "discord.js";

import { CommandsHandler, EventsHandler } from "./index";
import type { Command } from "./typescript/interfaces/Command";
import type { Event } from "./typescript/interfaces/Event";
import type {
  IShewenyClientOptions,
  IClientHandlers,
} from "./typescript/interfaces/ShewenyClient";

import { Collection } from "collection-data";

export class ShewenyClient extends Client {
  shewenyOptions: IShewenyClientOptions;
  admins: string[] | undefined;
  handlers: IClientHandlers = {};
  commands: Collection<string, Command> = new Collection();
  events: Collection<string, Event> = new Collection();
  commandsType: string | undefined;
  cooldowns: Collection<string, Collection<string, number>> = new Collection();

  constructor(options: IShewenyClientOptions) {
    super(options);
    this.shewenyOptions = options;
    if (options.admins) this.admins = options.admins;
    if (options.handlers) {
      if (options.handlers.commands) {
        this.handlers.commands = new CommandsHandler(this, options.handlers.commands);
      }
      if (options.handlers.events) {
        this.handlers.events = new EventsHandler(this, options.handlers.events.directory);
      }
    }

    this.init();
  }

  async init(dir = join(__dirname, "./events")) {
    readdirSync(dir).forEach(async (file) => {
      const event = await import(`${dir}/${file}`).then((e) => e.default);
      const evtName = file.split(".")[0];
      this.on(evtName, (...args) => event(this, ...args));
      console.log(`Event loaded: ${evtName}`);
    });
  }

  awaitReady(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isReady()) return resolve();
      const that: ShewenyClient = this;
      that.once("ready", () => resolve());
    });
  }
}