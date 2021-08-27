import type {
  ApplicationCommand,
  ApplicationCommandData,
  ApplicationCommandOptionData,
  ApplicationCommandResolvable,
  ButtonInteraction,
  Client,
  ClientEvents,
  ClientOptions,
  Collection as CollectionDjs,
  CommandInteraction,
  ContextMenuInteraction,
  GuildResolvable,
  PermissionString,
  SelectMenuInteraction,
  Snowflake,
} from "discord.js";
import type { Collection } from "collection-data";
import type { EventEmitter } from "events";

//#region Classes

export abstract class BaseStructure {
  public constructor(client: ShewenyClient, path?: string);

  public client: ShewenyClient;
  public path?: string;
}

export abstract class Button extends BaseStructure {
  public constructor(client: ShewenyClient, customId: string[]);

  public customId: string[];

  before?(interaction: ButtonInteraction): any | Promise<any>;
  abstract execute(interaction: ButtonInteraction): any | Promise<any>;
}

export class ButtonsManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  public directory: string;
  public buttons?: Collection<string[], Button>;

  public loadAll(): Promise<Collection<string[], Button>>;
}

export abstract class Command extends BaseStructure {
  public constructor(client: ShewenyClient, data: CommandData);

  public name: string;
  public type: "SLASH_COMMAND" | "CONTEXT_MENU_MESSAGE" | "CONTEXT_MENU_USER" | "MESSAGE";
  public description?: string;
  public defaultPermission?: boolean;
  public options?: ApplicationCommandOptionData[];
  public category: string;
  public channel: "GUILD" | "DM";
  public cooldown: number;
  public adminsOnly: boolean;
  public userPermissions: PermissionString[];
  public clientPermissions: PermissionString[];
  public aliases?: string[];
  public cooldowns: Collection<string, Collection<string, number>>;

  before?(...args: any[]): any | Promise<any>;
  abstract execute(...args: any[]): any | Promise<any>;

  public unregister(): boolean;
  public reload(): Promise<Collection<string, Event> | null>;
  public register(): Promise<Collection<string, Event>>;
}

export class CommandsManager extends EventEmitter {
  public constructor(
    client: ShewenyClient,
    directory: string,
    loadAll?: boolean,
    options?: CommandsManagerOptions
  );

  private client: ShewenyClient;
  public directory: string;
  public guildId?: string;
  public prefix?: string;
  public commands?: Collection<string, Command>;

  public loadAll(): Promise<Collection<string, Command>>;
  public loadAndRegisterAll(): Promise<void>;
  private renameCommandType(
    type: "SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"
  ): "CHAT_INPUT" | "MESSAGE" | "USER" | undefined;
  public getData(
    commands: Collection<string, Command> | Command | undefined
  ): ApplicationCommandData[] | ApplicationCommandData | undefined;
  public registerAllApplicationCommands(
    commands: Collection<string, Command> | undefined,
    guildId?: string
  ): Promise<
    | CollectionDjs<string, ApplicationCommand<{}>>
    | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  >;
  public createCommand(
    command: Command,
    guildId?: string
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  >;
  public editCommand(
    oldCommand: ApplicationCommandResolvable,
    newCommand: Command,
    guildId?: string
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  >;
  public deleteCommand(
    command: ApplicationCommandResolvable,
    guildId?: string
  ): Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined>;
  public deleteAllCommands(
    guildId?: string
  ): Promise<
    | CollectionDjs<string, ApplicationCommand<{}>>
    | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  >;

  public on<K extends keyof ManagerEvents>(
    event: K,
    listener: (...args: ManagerEvents[K]) => Awaited<void>
  ): this;
  public on<S extends string | symbol>(
    event: Exclude<S, keyof ManagerEvents>,
    listener: (...args: any[]) => Awaited<void>
  ): this;

  public once<K extends keyof ManagerEvents>(
    event: K,
    listener: (...args: ManagerEvents[K]) => Awaited<void>
  ): this;
  public once<S extends string | symbol>(
    event: Exclude<S, keyof ManagerEvents>,
    listener: (...args: any[]) => Awaited<void>
  ): this;

  public emit<K extends keyof ManagerEvents>(
    event: K,
    ...args: ManagerEvents[K]
  ): boolean;
  public emit<S extends string | symbol>(
    event: Exclude<S, keyof ManagerEvents>,
    ...args: unknown[]
  ): boolean;

  public off<K extends keyof ManagerEvents>(
    event: K,
    listener: (...args: ManagerEvents[K]) => Awaited<void>
  ): this;
  public off<S extends string | symbol>(
    event: Exclude<S, keyof ManagerEvents>,
    listener: (...args: any[]) => Awaited<void>
  ): this;

  public removeAllListeners<K extends keyof ManagerEvents>(event?: K): this;
  public removeAllListeners<S extends string | symbol>(
    event?: Exclude<S, keyof ManagerEvents>
  ): this;
}

export abstract class Event extends BaseStructure {
  public constructor(
    client: ShewenyClient,
    name: keyof ClientEvents,
    options?: EventOptions
  );

  public name: keyof ClientEvents;
  public description: string;
  public once: boolean;

  before?(...args: any[]): any | Promise<any>;
  abstract execute(...args: any[]): any | Promise<any>;

  public unregister(): boolean;
  public reload(): Promise<Collection<string, Event> | null>;
  public register(): Promise<Collection<string, Event>>;
}

export class EventsManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  private directory: string;
  public events: Collection<keyof ClientEvents, Event>;

  public loadAll(): Promise<Collection<keyof ClientEvents, Event>>;
  public registerAll(events?: Collection<keyof ClientEvents, Event>): Promise<void>;
}

export abstract class Inhibitor extends BaseStructure {
  public constructor(client: ShewenyClient, name: string, options?: InhibitorOptions);

  public name: string;
  public type: InhibitorType[];
  public priority: number;

  abstract onFailure(...args: any[]): any | Promise<any>;
  abstract execute(...args: any[]): any | Promise<any>;

  public unregister(): boolean;
  public reload(): Promise<Collection<string, Event> | null>;
  public register(): Promise<Collection<string, Event>>;
}

export class InhibitorsManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  public directory: string;
  public inhibitors?: Collection<string, Inhibitor>;

  public loadAll(): Promise<Collection<string, Inhibitor>>;
}

export abstract class SelectMenu extends BaseStructure {
  public constructor(client: ShewenyClient, customId: string[]);

  public customId: string[];

  before?(interaction: SelectMenuInteraction): any | Promise<any>;
  abstract execute(interaction: SelectMenuInteraction): any | Promise<any>;

  public unregister(): boolean;
  public reload(): Promise<Collection<string, Event> | null>;
  public register(): Promise<Collection<string, Event>>;
}

export class SelectMenusManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  public directory: string;
  public selectMenus?: Collection<string[], SelectMenu>;

  public loadAll(): Promise<Collection<string[], SelectMenu>>;
}

export class ShewenyClient extends Client {
  public constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions);

  public admins: Snowflake[];
  public handlers: HandlersManager;
  public collections: HandlersCollections;
}

//#endregion Classes

//#region Interfaces

interface ApplicationCommands {
  type: "applications";
  directory: string;
  guildId?: string;
}

interface CommandsManagerOptions {
  guildId?: string;
  prefix?: string;
}

interface ContextMenuMessageData {
  name: string;
  description: string;
  type: "CONTEXT_MENU_MESSAGE";
  defaultPermission?: boolean;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

interface ContextMenuUserData {
  name: string;
  type: "CONTEXT_MENU_USER";
  description: string;
  defaultPermission?: boolean;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

interface EventOptions {
  description?: string;
  once?: boolean;
}

interface HandlersCollections {
  commands?: Collection<string, Command>;
  events?: Collection<keyof ClientEvents, Event>;
  buttons?: Collection<string[], Button>;
  selectMenus?: Collection<string[], SelectMenu>;
  inhibitors?: Collection<string, Inhibitor>;
}

interface HandlersManager {
  commands: CommandsManager;
  events?: EventsManager;
  buttons?: ButtonsManager;
  selectMenus?: SelectMenusManager;

  inhibitors?: InhibitorsManager;
}

interface HandlersOptions {
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

interface InhibitorOptions {
  type?: InhibitorType[];
  priority?: number;
}

export interface ManagerEvents {
  userMissingPermissions: [
    interaction: CommandInteraction | ContextMenuInteraction,
    missing: string
  ];
  clientMissingPermissions: [
    interaction: CommandInteraction | ContextMenuInteraction,
    missing: string
  ];
  cooldownLimit: [interaction: CommandInteraction | ContextMenuInteraction];
}

interface MessageCommands {
  type: "messages";
  directory: string;
  prefix: string;
}

interface MessageData {
  name: string;
  type: "MESSAGE";
  description?: string;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

interface SlashCommandData {
  name: string;
  description: string;
  type: "SLASH_COMMAND";
  options?: ApplicationCommandOptionData[];
  defaultPermission?: boolean;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

export interface ShewenyClientOptions extends ClientOptions {
  admins?: Snowflake[];
  handlers?: HandlersOptions;
}

//#endregion Interfaces

//#region Types

export type Awaited<T> = T | PromiseLike<T>;

export type CommandData =
  | SlashCommandData
  | ContextMenuUserData
  | ContextMenuMessageData
  | MessageData;

export type CommandsOptions = MessageCommands | ApplicationCommands;

type InhibitorType =
  | "MESSAGE_COMMAND"
  | "APPLICATION_COMMAND"
  | "BUTTON"
  | "SELECT_MENU"
  | "ALL";

//#endregion Types
