import { Client, Snowflake } from "discord.js";
import type { ShewenyClientOptions } from "../interfaces/Client";
import type { Handler } from "../interfaces/Handlers";
import { EventsManager } from "../managers/EventsManager";
import { CommandsManager } from "../managers/CommandsManager";
import { ButtonsManager } from "../managers/ButtonsManager";
import { SelectMenusManager } from "../managers/SelectMenusManager";

export class ShewenyClient extends Client {
  public admins: Snowflake[];
  public handlers: Handler;

  constructor(options: ShewenyClientOptions) {
    super(options);

    this.admins = options.admins || [];
    this.handlers = { collections: { interactions: {} }, manager: { interactions: {} } };

    this.handlers.manager.commands =
      options.handlers?.commands?.type === "applications"
        ? new CommandsManager(
            this,
            options.handlers.commands.directory,
            true,
            options.handlers.commands.guildId
          )
        : undefined;

    this.handlers.manager.events = options.handlers?.events
      ? new EventsManager(this, options.handlers.events.directory, true)
      : undefined;

    this.handlers.manager.interactions.buttons = options.handlers?.interactions?.buttons
      ? new ButtonsManager(this, options.handlers.interactions.buttons.directory, true)
      : undefined;

    this.handlers.manager.interactions.selectMenus = options.handlers?.interactions
      ?.selectMenus
      ? new SelectMenusManager(this, options.handlers.interactions.selectMenus.directory)
      : undefined;

    this.handlers.manager.inhibitors = options.handlers?.inhibitors ? "ok" : undefined;
  }
}
