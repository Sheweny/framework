import { Client, Snowflake } from "discord.js";
import { EventsManager } from "../handlers/EventsManager";
import type { handler } from "../interfaces/Handlers";
import type { ShewenyClientOptions } from "../interfaces/Client";

export class ShewenyClient extends Client {
  public admins: Snowflake[];
  public handlers: handler;

  constructor(options: ShewenyClientOptions) {
    super(options);

    this.admins = options.admins || [];
    this.handlers = {
      collections: { commands: {}, interactions: {} },
      manager: { commands: {}, interactions: {} },
    };

    this.handlers.manager.commands.applications =
      options.handlers?.commands?.type === "applications" ? "ok" : undefined;

    this.handlers.manager.commands.messages =
      options.handlers?.commands?.type === "messages" ? "ok" : undefined;

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
