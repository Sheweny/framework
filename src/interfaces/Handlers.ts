import type { ClientEvents } from "discord.js";
import type { Collection } from "collection-data";
import type { ButtonsManager } from "../managers/ButtonsManager";
import type { CommandsManager } from "../managers/CommandsManager";
import type { EventsManager } from "../managers/EventsManager";
import type { InhibitorsManager } from "../managers/InhibitorsManager";
import type { SelectMenusManager } from "../managers/SelectMenusManager";
import type { Button } from "../structures/Button";
import type { Command } from "../structures/Command";
import type { Event } from "../structures/Event";
import type { Inhibitor } from "../structures/Inhibitor";
import type { SelectMenu } from "../structures/SelectMenu";

//#region Interfaces

interface ApplicationCommands {
  type: "applications";
  directory: string;
  guildId?: string;
}

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
  commands?: CommandsOptions;
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

interface MessageCommands {
  type: "messages";
  directory: string;
  prefix: string;
}

//#endregion Interfaces

//#region Types

export type CommandsOptions = MessageCommands | ApplicationCommands;

//#endregion Types
