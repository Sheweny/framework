import { Client, Snowflake } from "discord.js";
import type { ShewenyClientOptions } from "../interfaces/Client";
import type { Handler } from "../interfaces/Handlers";
import { EventsManager } from "../handlers/EventsManager";
import { CommandsManager } from "../handlers/CommandsManager";

export class ShewenyClient extends Client {
  public admins: Snowflake[];
  public handlers: Handler;

  constructor(options: ShewenyClientOptions) {
    super(options);

    this.admins = options.admins || [];
    this.handlers = { collections: { interactions: {} }, manager: { interactions: {} } };

    this.handlers.manager.commands =
      options.handlers?.commands?.type === "applications"
        ? new CommandsManager(this, options.handlers.commands.directory, true)
        : undefined;

    this.handlers.manager.events = options.handlers?.events
      ? new EventsManager(this, options.handlers.events.directory, true)
      : undefined;

    this.handlers.manager.interactions.buttons = options.handlers?.interactions?.buttons
      ? "ok"
      : undefined;

    this.handlers.manager.interactions.selectMenus = options.handlers?.interactions
      ?.selectMenus
      ? "ok"
      : undefined;

    this.handlers.manager.inhibitors = options.handlers?.inhibitors ? "ok" : undefined;
  }
}
