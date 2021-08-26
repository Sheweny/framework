import { Client, Snowflake } from "discord.js";
import type { ClientOptions } from "discord.js";
import type { ShewenyClientOptions } from "../interfaces/Client";
import type {
  HandlersManager,
  HandlersCollectionsManager,
} from "../interfaces/Handlers";
import { EventsManager } from "../managers/EventsManager";
import { CommandsManager } from "../managers/CommandsManager";
import { ButtonsManager } from "../managers/ButtonsManager";
import { SelectMenusManager } from "../managers/SelectMenusManager";
import { InhibitorsManager } from "../managers/InhibitorsManager";

export class ShewenyClient extends Client {
  public admins: Snowflake[];
  public handlers: HandlersManager = {};
  public collections: HandlersCollectionsManager = {};
  constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions) {
    super(clientOptions || options);

    this.admins = options.admins || [];

    this.handlers.commands =
      options.handlers?.commands?.type === "applications"
        ? new CommandsManager(
            this,
            options.handlers.commands.directory,
            true,
            options.handlers.commands.guildId
          )
        : options.handlers?.commands?.type === "messages"
        ? new CommandsManager(this, options.handlers.commands.directory, true)
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
