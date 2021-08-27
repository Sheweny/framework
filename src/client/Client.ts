import { Client } from "discord.js";
import {
  ButtonsManager,
  CommandsManager,
  EventsManager,
  InhibitorsManager,
  SelectMenusManager,
} from "../managers";
import type { HandlersManager, HandlersCollections } from "../interfaces/Handlers";
import { join } from "path";
import { readdir } from "fs/promises";
import { DiscordResolve } from "@sheweny/resolve";
import type { Snowflake, ClientOptions } from "discord.js";
import type { ShewenyClientOptions } from "../interfaces/Client";
export class ShewenyClient extends Client {
  public admins: Snowflake[];
  public handlers: HandlersManager = {};
  public collections: HandlersCollections = {};
  public util: DiscordResolve = new DiscordResolve(this);
  constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions) {
    super(clientOptions || options);

    this.admins = options.admins || [];

    this.handlers.commands = options.handlers?.commands
      ? new CommandsManager(this, options.handlers.commands.directory, true, {
          guildId: options.handlers.commands.guildId,
          prefix: options.handlers.commands.prefix,
        })
      : undefined;

    this.handlers.events = options.handlers?.events
      ? new EventsManager(this, options.handlers.events.directory, true)
      : undefined;

    this.handlers.buttons = options.handlers?.buttons
      ? new ButtonsManager(this, options.handlers.buttons.directory, true)
      : undefined;

    this.handlers.selectMenus = options.handlers?.selectMenus
      ? new SelectMenusManager(this, options.handlers.selectMenus.directory)
      : undefined;

    this.handlers.inhibitors = options.handlers?.inhibitors
      ? new InhibitorsManager(this, options.handlers.inhibitors.directory, true)
      : undefined;

    (async () => {
      const dir = join(__dirname, "../events");
      const files = await readdir(dir);

      for (const file of files) {
        const event = await import(`${dir}/${file}`).then((e) => e.default);
        const evtName = file.split(".")[0];
        this.on(evtName, (...args) => event(this, ...args));
      }
    })();
  }

  public awaitReady() {
    return new Promise((resolve) => {
      this.on("ready", () => {
        resolve(true);
      });
    });
  }
}
