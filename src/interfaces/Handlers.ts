import { Collection } from "discord.js";
import { CommandsManager } from "../managers/CommandsManager";
import { EventsManager } from "../managers/EventsManager";
import { Command } from "../structures/Command";
import { Event } from "../structures/Event";

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
  events?: Collection<string, Event>;
  interactions: {
    buttons?: string;
    selectMenus?: string;
  };
  inhibitors?: string;
}

interface HandlersManager {
  commands?: CommandsManager;
  events?: EventsManager;
  interactions: {
    buttons?: string;
    selectMenus?: string;
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
