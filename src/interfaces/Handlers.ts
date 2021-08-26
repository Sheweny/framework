import type { ClientEvents, Collection } from "discord.js";
import type { ButtonsManager } from "../managers/ButtonsManager";
import type { CommandsManager } from "../managers/CommandsManager";
import type { EventsManager } from "../managers/EventsManager";
import type { SelectMenusManager } from "../managers/SelectMenusManager";
import type { Button } from "../structures/Button";
import type { Command } from "../structures/Command";
import type { Event } from "../structures/Event";
import type { SelectMenu } from "../structures/SelectMenu";

//#region Interfaces

interface ApplicationCommands {
  type: "applications";
  directory: string;
  guildId?: string;
}

export interface Handler {
  collections: HandlersCollectionsManager;
  manager: HandlersManager;
}

interface HandlersCollectionsManager {
  commands?: Collection<string, Command>;
  events?: Collection<keyof ClientEvents, Event>;
  interactions: {
    buttons?: Collection<string[], Button>;
    selectMenus?: Collection<string[], SelectMenu>;
  };
  inhibitors?: string;
}

interface HandlersManager {
  commands?: CommandsManager;
  events?: EventsManager;
  interactions: {
    buttons?: ButtonsManager;
    selectMenus?: SelectMenusManager;
  };
  inhibitors?: string;
}

export interface HandlersOptions {
  commands?: CommandsOptions;
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

interface MessageCommands {
  type: "messages";
  directory: string;
  prefix: string;
}

//#endregion Interfaces

//#region Types

export type CommandsOptions = MessageCommands | ApplicationCommands;

//#endregion Types
