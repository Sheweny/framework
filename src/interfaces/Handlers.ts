import type { Snowflake } from "discord.js";
import type { Collection } from "collection-data";
import type {
  ButtonsManager,
  CommandsManager,
  EventsManager,
  InhibitorsManager,
  SelectMenusManager,
} from "../managers";
import type { Button, Command, Event, Inhibitor, SelectMenu } from "../structures";

/**
 * Options for commands handler option
 */
interface CommandsManagerOptions {
  directory: string;
  guildId?: Snowflake;
  prefix?: string;
  applicationPermissions?: boolean;
}

/**
 * Collections of handlers
 */
export interface HandlersCollections {
  commands?: Collection<string, Command>;
  events?: Collection<string, Event>;
  buttons?: Collection<string[], Button>;
  selectMenus?: Collection<string[], SelectMenu>;
  inhibitors?: Collection<string, Inhibitor>;
}

/**
 * Managers of handlers
 */
export interface HandlersManager {
  commands?: CommandsManager;
  events?: EventsManager;
  buttons?: ButtonsManager;
  selectMenus?: SelectMenusManager;
  inhibitors?: InhibitorsManager;
}

/**
 * Options of handler in Sheweny client option
 */
export interface HandlersOptions {
  commands?: CommandsManagerOptions;
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
