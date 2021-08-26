import { Client, Snowflake } from "discord.js";
import type { ShewenyClientOptions } from "../interfaces/Client";
import type { HandlersManager, HandlersCollections } from "../interfaces/Handlers";
import { EventsManager } from "../managers/EventsManager";
import { CommandsManager } from "../managers/CommandsManager";
import { ButtonsManager } from "../managers/ButtonsManager";
import { SelectMenusManager } from "../managers/SelectMenusManager";
import { InhibitorsManager } from "../managers/InhibitorsManager";

export class ShewenyClient extends Client {
  public admins: Snowflake[];
  public handlers: HandlersManager = {};
  public collections: HandlersCollections = {};

  constructor(options: ShewenyClientOptions) {
    super(options);

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

    this.handlers.buttons = options.handlers?.interactions?.buttons
      ? new ButtonsManager(this, options.handlers.interactions.buttons.directory, true)
      : undefined;

    this.handlers.selectMenus = options.handlers?.interactions?.selectMenus
      ? new SelectMenusManager(this, options.handlers.interactions.selectMenus.directory)
      : undefined;

    this.handlers.inhibitors = options.handlers?.inhibitors
      ? new InhibitorsManager(this, options.handlers.inhibitors.directory, true)
      : undefined;
  }
}
