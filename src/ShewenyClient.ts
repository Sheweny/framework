import { readdir } from "fs/promises";
import { join } from "path";
import { Client, ClientOptions } from "discord.js";
import { Collection } from "collection-data";
import {
  MessageCommandsHandler,
  ApplicationCommandHandler,
  EventsHandler,
  ButtonsHandler,
  SelectMenusHandler,
  InhibitorsHandler,
} from "./handlers";
import type { IMessageCommandHandlerOptions } from "./typescript/interfaces/interfaces";
import {
  ApplicationCommand,
  MessageCommand,
  Button,
  Event,
  Inhibitor,
  SelectMenu,
} from "./structures";

interface IClientHandlersOptions {
  messageCommands?: MessageCommandsHandler;
  applicationCommands?: ApplicationCommandHandler;
  events?: EventsHandler;
  buttons?: ButtonsHandler;
  selectMenus?: SelectMenusHandler;
  contextMenus?: null;
  inhibitors?: InhibitorsHandler;
}

interface IOptionsHandlers {
  messageCommands?: IMessageCommandHandlerOptions;
  applicationCommands?: {
    directory: string;
    guildId?: string;
  };
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

interface ICommandsManager {
  interaction?: Collection<string, ApplicationCommand>;
  message?: Collection<string, MessageCommand>;
}

interface IShewenyClientOptions extends ClientOptions {
  handlers?: IOptionsHandlers;
  admins?: string[];
}

/**
 * The main hub for interacting with the Discord API, and the starting point for any bot.
 * @class ShewenyClient
 * @extends Client Discord.js Client
 */
export class ShewenyClient extends Client {
  shewenyOptions: IShewenyClientOptions;
  admins?: string[];
  handlers: IClientHandlersOptions = {};
  commands: ICommandsManager = {};
  events?: Collection<string, Event>;
  buttons?: Collection<string[], Button>;
  selectMenus?: Collection<string[], SelectMenu>;
  inhibitors?: Collection<string, Inhibitor>;
  commandsType?: "MESSAGE_COMMANDS" | "APPLICATION_COMMANDS";
  cooldowns: Collection<string, Collection<string, number>> = new Collection();

  /**
   * @constructor Constructor of ShewenyClient
   * @param {IShewenyClientOptions} options - The options for the client
   */
  constructor(options: IShewenyClientOptions) {
    super(options);

    this.shewenyOptions = options;
    this.admins = options.admins;

    this.handlers.messageCommands = options.handlers?.messageCommands
      ? new MessageCommandsHandler(options.handlers.messageCommands, this, true)
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
    this.handlers.applicationCommands = options.handlers?.applicationCommands
      ? new ApplicationCommandHandler(
          this,
          options.handlers.applicationCommands.directory,
          { loadAll: true, guildId: options.handlers.applicationCommands.guildId }
        )
      : undefined;
    this.handlers.inhibitors = options.handlers?.inhibitors
      ? new InhibitorsHandler(options.handlers.inhibitors.directory, this, true)
      : undefined;

    this.init();
  }

  /**
   * Init ShewenyClient
   * @async
   * @private
   * @returns {Promise<void>}
   */
  private async init(): Promise<void> {
    const dir = join(__dirname, "./events");
    const files = await readdir(dir);

    for (const file of files) {
      const event = await import(`${dir}/${file}`).then((e) => e.default);
      const evtName = file.split(".")[0];
      this.on(evtName, (...args) => event(this, ...args));
    }
  }

  /**
   * Resolve when client is ready
   * @public
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
