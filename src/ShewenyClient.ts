import { readdirSync } from "fs";
import { join } from "path";
import { Client } from "discord.js";
import { Collection } from "collection-data";

import { CommandsHandler, EventsHandler, ButtonsHandler } from "./index";

import type { ClientOptions } from "discord.js";
import type {
  Command,
  Event,
  Button,
  ICommandHandlerOptions,
} from "./typescript/interfaces/interfaces";

interface IClientHandlers {
  commands?: CommandsHandler;
  events?: EventsHandler;
  buttons?: ButtonsHandler;
}

interface IOptionsHandlers {
  commands?: ICommandHandlerOptions;
  events?: {
    directory: string;
  };
  buttons?: {
    directory: string;
  };
}

interface IShewenyClientOptions extends ClientOptions {
  handlers?: IOptionsHandlers;
  admins?: string[];
}

/**
 * The main hub for interacting with the Discord API, and the starting point for any bot.
 * @class
 */
export class ShewenyClient extends Client {
  shewenyOptions: IShewenyClientOptions;
  admins?: string[];
  handlers: IClientHandlers = {};
  commands: Collection<string, Command> = new Collection();
  events: Collection<string, Event> = new Collection();
  buttons: Collection<string[], Button> = new Collection();
  commandsType?: string;
  cooldowns: Collection<string, Collection<string, number>> = new Collection();
  /**
   * @param {Object} options - The options for the client
   */
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
      if (options.handlers.buttons) {
        this.handlers.buttons = new ButtonsHandler(
          this,
          options.handlers.buttons.directory
        );
      }
    }

    this.init();
  }
  /**
   * @param {string} [dir=./events] - The directory of framework events
   * @returns {undefined}
   */
  async init(dir = join(__dirname, "./events")) {
    readdirSync(dir).forEach(async (file) => {
      const event = await import(`${dir}/${file}`).then((e) => e.default);
      const evtName = file.split(".")[0];
      this.on(evtName, (...args) => event(this, ...args));
    });
  }
  /**
   * Resolve when client is ready
   * @returns {Promise<undefined>}
   */
  awaitReady(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isReady()) return resolve();
      const that: ShewenyClient = this;
      that.once("ready", () => resolve());
    });
  }
}
