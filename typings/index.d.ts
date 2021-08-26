import type { Client, ClientOptions, Collection, Snowflake } from "discord.js";

//#region Classes

export class ShewenyClient {
  public constructor(options: ShewenyClientOptions);
  public admins: Snowflake[];
  public handlers: handler;
}

export class EventsManager {
  public constructor(
    client: ShewenyClient | Client,
    directory: string,
    loadAll?: boolean
  );
  private client: ShewenyClient | Client;
  private directory: string;

  public loadAll(): Promise<Collection<string, Event>>;
  public registerAll(events?: Collection<string, Event>): Promise<void>;
}

export abstract class Event {
  public constructor(
    client: ShewenyClient | Client,
    name: string,
    options?: EVentOptions
  );
  public client: ShewenyClient | Client;
  public name: string;
  public description: string;
  public once: boolean;
  public path: string;

  before?(...args: any[]): any | Promise<any>;

  abstract execute(...args: any[]): any | Promise<any>;
}

//#endregion Classes

//#region Interfaces

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
  commands: {
    messages?: string;
    applications?: string;
  };
  events?: Collection<string, Event>;
  interactions: {
    buttons?: string;
    selectMenus?: string;
  };
  inhibitors?: string;
}

export interface handlersManager {
  commands: {
    messages?: string;
    applications?: string;
  };
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

export interface ShewenyClientOptions extends ClientOptions {
  admins?: Snowflake[];
  handlers?: handlersOptions;
}

export interface EVentOptions {
  description?: string;
  once?: boolean;
}

//#endregion Interfaces
