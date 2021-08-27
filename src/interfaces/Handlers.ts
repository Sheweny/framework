import type { ClientEvents } from "discord.js";
import type { Collection } from "collection-data";
import type {
  ButtonsManager,
  CommandsManager,
  EventsManager,
  InhibitorsManager,
  SelectMenusManager,
} from "../managers";
import type { Button, Command, Event, Inhibitor, SelectMenu } from "../structures";

export interface Handler {
  collections: HandlersCollections;
  manager: HandlersManager;
}

export interface HandlersCollections {
  commands?: Collection<string, Command>;
  events?: Collection<keyof ClientEvents, Event>;
  buttons?: Collection<string[], Button>;
  selectMenus?: Collection<string[], SelectMenu>;
  inhibitors?: Collection<string, Inhibitor>;
}

export interface HandlersManager {
  commands?: CommandsManager;
  events?: EventsManager;
  buttons?: ButtonsManager;
  selectMenus?: SelectMenusManager;
  inhibitors?: InhibitorsManager;
}

export interface HandlersOptions {
  commands?: {
    directory: string;
    prefix?: string;
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
