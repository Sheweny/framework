import { Client } from "discord.js";
import {
  ButtonsManager,
  CommandsManager,
  EventsManager,
  InhibitorsManager,
  SelectMenusManager,
} from "../managers";
import type { Snowflake, ClientOptions } from "discord.js";
import type { ShewenyClientOptions } from "../interfaces/Client";
import type { HandlersManager, HandlersCollections } from "../interfaces/Handlers";

export class ShewenyClient extends Client {
  public admins: Snowflake[];
  public handlers: HandlersManager = {};
  public collections: HandlersCollections = {};

  constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions) {
    super(clientOptions || options);

    this.admins = options.admins || [];

    this.handlers.commands = options.handlers?.commands
      ? options.handlers.commands.type === "applications"
        ? new CommandsManager(
            this,
            options.handlers.commands.directory,
            true,
            options.handlers.commands.guildId
          )
        : new CommandsManager(this, options.handlers.commands.directory, true)
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
  }
}
