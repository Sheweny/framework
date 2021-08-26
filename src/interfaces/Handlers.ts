import { Collection } from "discord.js";
import { CommandsManager } from "../handlers/CommandsManager";
import { EventsManager } from "../handlers/EventsManager";
import { Command } from "../structures/Command";
import { Event } from "../structures/Event";

interface messageCommands {
  type: "messages";
  directory: string;
  prefix: string;
}

interface applicationCommands {
  type: "applications";
  directory: string;
  guildId?: string;
}

export type commandsOptions = messageCommands | applicationCommands;

export interface handlersOptions {
  commands?: commandsOptions;
  events?: {
    directory: string;
  };
  interactions?: {
    buttons?: {
      directory: string;
    };
    selectMenus?: {
      directory: string;
    };
  };
  inhibitors?: {
    directory: string;
  };
}

export interface handlersCollectionsManager {
  commands?: Collection<string, Command>;
  events?: Collection<string, Event>;
  interactions: {
    buttons?: string;
    selectMenus?: string;
  };
  inhibitors?: string;
}

export interface handlersManager {
  commands?: CommandsManager;
  events?: EventsManager;
  interactions: {
    buttons?: string;
    selectMenus?: string;
  };
  inhibitors?: string;
}

export interface handler {
  collections: handlersCollectionsManager;
  manager: handlersManager;
}
