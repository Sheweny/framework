import { readdirSync } from "fs";
import { join } from "path";
import { Client, ClientOptions } from "discord.js";
import { Collection } from "collection-data";

import {
  CommandsHandler,
  EventsHandler,
  ButtonsHandler,
  SelectMenusHandler,
  InhibitorsHandler,
} from ".";
import type {
  Command,
  Event,
  Button,
  ICommandHandlerOptions,
  SelectMenu,
  Inhibitor,
} from "./typescript/interfaces/interfaces";

interface IClientHandlers {
  commands?: CommandsHandler;
  events?: EventsHandler;
  buttons?: ButtonsHandler;
  selectMenus?: SelectMenusHandler;
  inhibitors?: InhibitorsHandler;
}

interface IOptionsHandlers {
  commands?: ICommandHandlerOptions;
  events?: {
    directory: string;
  };
  buttons?: {
    directory: string;
  };
  selectMenus?: {
    directory: string;
  };
  inhibitors?: {
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
  commands?: Collection<string, Command>;
  events?: Collection<string, Event>;
  buttons?: Collection<string[], Button>;
  selectMenus?: Collection<string[], SelectMenu>;
  inhibitors?: Collection<string, Inhibitor>;
  commandsType?: string;
  cooldowns: Collection<string, Collection<string, number>> = new Collection();

  /**
   * @param {Object} options - The options for the client
   */
  constructor(options: IShewenyClientOptions) {
    super(options);

    this.shewenyOptions = options;
    this.admins = options.admins;

    this.handlers.commands = options.handlers?.commands
      ? new CommandsHandler(options.handlers.commands, this, true)
      : undefined;
    this.handlers.events = options.handlers?.events
      ? new EventsHandler(options.handlers.events.directory, this, true)
      : undefined;
    this.handlers.buttons = options.handlers?.buttons
      ? new ButtonsHandler(options.handlers.buttons.directory, this, true)
      : undefined;
    this.handlers.selectMenus = options.handlers?.selectMenus
      ? new SelectMenusHandler(options.handlers.selectMenus.directory, this, true)
      : undefined;
    this.handlers.inhibitors = options.handlers?.inhibitors
      ? new InhibitorsHandler(options.handlers.inhibitors.directory, this, true)
      : undefined;

    this.init();
  }

  /**
   * @param {string} [dir=./events] - The directory of framework events
   * @returns {Promise<void>}
   */
  public async init(dir: string = join(__dirname, "./events")): Promise<void> {
    readdirSync(dir).forEach(async (file) => {
      const event = await import(`${dir}/${file}`).then((e) => e.default);
      const evtName = file.split(".")[0];
      this.on(evtName, (...args) => event(this, ...args));
    });
  }

  /**
   * Resolve when client is ready
   * @returns {Promise<void>}
   */
  public awaitReady(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isReady()) return resolve();
      const that: ShewenyClient = this;
      that.once("ready", () => resolve());
    });
  }
}
