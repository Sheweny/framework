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
import { MongooseDatabase } from "../database/Mongoose";

/**
 * Sheweny framework client
 */
export class ShewenyClient extends Client {
  /**
   * The ID of the bot admins
   * @type {Snowflake[]}
   */
  public admins: Snowflake[];

  /**
   * The manager of handlers
   * @type {HandlersManager}
   */
  public handlers: HandlersManager = {};

  /**
   * The collections of handlers
   * @type {HandlersManager}
   */
  public collections: HandlersCollections = {};

  /**
   * A util tool to resolve channel, user, etc
   * @type {DiscordResolve}
   */
  public util: DiscordResolve = new DiscordResolve(this);

  /**
   * If the client joins a Thread when created
   * @type {boolean}
   */
  public joinThreadsOnCreate: boolean;

  /**
   * Database manager for mongoose
   * @type {MongooseDatabase | undefined}
   */
  public database?: MongooseDatabase;

  /**
   * Set options and your client is ready
   * @param {ShewenyClientOptions} options Client framework options
   * @param {ClientOptions} [clientOptions] Client discord.js options
   */
  constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions) {
    super(clientOptions || options);

    this.admins = options.admins || [];
    this.joinThreadsOnCreate = options.joinThreadsOnCreate || false;

    this.database = options.db
      ? new MongooseDatabase(this, options.db.uri, {
          connectOptions: options.db.connectOptions,
          directory: options.db.directory,
        })
      : undefined;

    this.handlers.commands = options.handlers?.commands
      ? new CommandsManager(this, options.handlers.commands.directory, true, {
          guildId: options.handlers.commands.guildId,
          prefix: options.handlers.commands.prefix,
          applicationPermissions: options.handlers.commands.applicationPermissions,
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

  /**
   * Return true when the client is ready
   * @returns {Promise<boolean>}
   */
  public awaitReady(): Promise<boolean> {
    return new Promise((resolve) => {
      this.on("ready", () => {
        resolve(true);
      });
    });
  }
}
