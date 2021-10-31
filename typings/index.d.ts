import type {
  ApplicationCommand,
  ApplicationCommandData,
  ApplicationCommandOptionData,
  ApplicationCommandResolvable,
  ApplicationCommandType,
  ButtonInteraction,
  Client,
  ClientEvents,
  ClientOptions,
  Collection as CollectionDjs,
  CommandInteraction,
  ContextMenuInteraction,
  GuildResolvable,
  Message,
  PermissionString,
  SelectMenuInteraction,
  Snowflake,
} from "discord.js";
import type { Collection } from "collection-data";
import type { EventEmitter } from "events";
import type { DiscordResolve } from "@sheweny/resolve";

//#region Classes

export abstract class BaseStructure<T> {
  public constructor(client: T, path?: string);

  public client: T;
  public path?: string;
}

export abstract class Button<T = ShewenyClient> extends BaseStructure<T> {
  public constructor(client: T, customId: string[]);

  public customId: string[];

  before?(interaction: ButtonInteraction): any | Promise<any>;
  abstract execute(interaction: ButtonInteraction): any | Promise<any>;

  public unregister(): boolean;
  public reload(): Promise<Collection<string, Button> | null>;
  public register(): Promise<Collection<string, Button>>;
}

export class ButtonsManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  public directory: string;
  public buttons?: Collection<string[], Button>;

  public loadAll(): Promise<Collection<string[], Button> | undefined>;
}

export abstract class Command<T = ShewenyClient> extends BaseStructure<T> {
  public constructor(client: ShewenyClient, data: CommandData);

  public name: string;
  public description?: string;
  public type?:
    | "SLASH_COMMAND"
    | "CONTEXT_MENU_MESSAGE"
    | "CONTEXT_MENU_USER"
    | "MESSAGE_COMMAND";
  public defaultPermission?: boolean;
  public options?: ApplicationCommandOptionData[];
  public args?: MessageCommandOptionData[];
  public category: string;
  public channel?: "GUILD" | "DM";
  public cooldown: number;
  public adminsOnly: boolean;
  public userPermissions: PermissionString[];
  public clientPermissions: PermissionString[];
  public aliases?: string[];
  public cooldowns: Collection<string, Collection<string, number>>;

  before?(
    request: CommandInteraction | Message,
    args?: MessageCommandArgs[]
  ): any | Promise<any>;
  abstract execute(
    request: CommandInteraction | Message,
    args?: MessageCommandArgs[]
  ): any | Promise<any>;

  public unregister(): boolean;
  public reload(): Promise<Collection<string, Command> | null>;
  public register(): Promise<Collection<string, Command>>;
}

export class CommandsManager extends EventEmitter {
  public constructor(
    client: ShewenyClient,
    directory: string,
    options?: CommandsManagerOptions
  );

  private client: ShewenyClient;
  public directory: string;
  public guildId?: Snowflake;
  public prefix?: string;
  public applicationPermissions?: boolean;
  public commands?: Collection<string, Command>;

  public loadAll(): Promise<Collection<string, Command> | undefined>;
  public loadAndRegisterAll(): Promise<void>;

  private renameCommandType(
    type: "SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"
  ): ApplicationCommandType | undefined;

  public getData(
    commands: Collection<string, Command> | Command | undefined
  ): ApplicationCommandData[] | ApplicationCommandData | undefined;

  public registerAllApplicationCommands(
    commands: Collection<string, Command> | undefined,
    guildId: Snowflake | undefined
  ): Promise<
    | CollectionDjs<string, ApplicationCommand<{}>>
    | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  >;
  public registerPermissions(
    applicationCommands: CollectionDjs<string, ApplicationCommand<{}>> | undefined,
    commandsCollection: Collection<string, Command> | undefined,
    guildId: Snowflake | Snowflake[] | undefined
  ): Promise<void>;
  public createCommand(
    command: Command,
    guildId?: Snowflake
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  >;
  public editCommand(
    oldCommand: ApplicationCommandResolvable,
    newCommand: Command,
    guildId?: Snowflake
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  >;
  public deleteCommand(
    command: ApplicationCommandResolvable,
    guildId?: Snowflake
  ): Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined>;
  public deleteAllCommands(
    guildId?: Snowflake
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

export abstract class Event<T = ShewenyClient> extends BaseStructure<T> {
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
  public directory: string;
  public events?: Collection<keyof ClientEvents, Event>;

  public loadAll(): Promise<Collection<keyof ClientEvents, Event> | undefined>;
  public registerAll(events?: Collection<keyof ClientEvents, Event>): Promise<void>;
  public loadAndRegisterAll(): Promise<void>;
}

export abstract class Inhibitor<T = ShewenyClient> extends BaseStructure<T> {
  public constructor(client: ShewenyClient, name: string, options?: InhibitorOptions);

  public name: string;
  public type: InhibitorType[];
  public priority: number;

  abstract onFailure(...args: any[]): any | Promise<any>;
  abstract execute(...args: any[]): any | Promise<any>;

  public unregister(): boolean;
  public reload(): Promise<Collection<string, Inhibitor> | null>;
  public register(): Promise<Collection<string, Inhibitor>>;
}

export class InhibitorsManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  public directory: string;
  public inhibitors?: Collection<string, Inhibitor>;

  public loadAll(): Promise<Collection<string, Inhibitor> | undefined>;
}

export abstract class SelectMenu<T = ShewenyClient> extends BaseStructure<T> {
  public constructor(client: ShewenyClient, customId: string[]);

  public customId: string[];

  before?(interaction: SelectMenuInteraction): any | Promise<any>;
  abstract execute(interaction: SelectMenuInteraction): any | Promise<any>;

  public unregister(): boolean;
  public reload(): Promise<Collection<string, SelectMenu> | null>;
  public register(): Promise<Collection<string, SelectMenu>>;
}

export class SelectMenusManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  public directory: string;
  public selectMenus?: Collection<string[], SelectMenu>;

  public loadAll(): Promise<Collection<string[], SelectMenu> | undefined>;
}

export class ShewenyClient extends Client {
  public constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions);
  public mode: "development" | "production";
  public admins: Snowflake[];
  public handlers: HandlersManager;
  public collections: HandlersCollections;
  public util: DiscordResolve;
  public joinThreadsOnCreate: boolean;
}

//#endregion Classes

//#region Interfaces

interface CommandsManagerOptions {
  loadAll?: boolean;
  guildId?: Snowflake;
  prefix?: string;
  applicationPermissions?: boolean;
}

interface CommandsOptions {
  directory: string;
  loadAll?: boolean;
  guildId?: Snowflake;
  prefix?: string;
  applicationPermissions?: boolean;
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
  commands?: CommandsManager;
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

interface InhibitorOptions {
  type?: InhibitorType[];
  priority?: number;
}

export interface ManagerEvents {
  userMissingPermissions: [
    ctx: CommandInteraction | ContextMenuInteraction | Message,
    missing: string
  ];
  clientMissingPermissions: [
    ctx: CommandInteraction | ContextMenuInteraction | Message,
    missing: string
  ];
  cooldownLimit: [ctx: CommandInteraction | ContextMenuInteraction | Message];
}

interface MessageCommandArgs {
  [index: string]: any;
}

interface MessageCommandOptionData {
  name: string;
  type:
    | "STRING"
    | "NUMBER"
    | "BOOLEAN"
    | "REST"
    | "GUILD"
    | "CHANNEL"
    | "MEMBER"
    | "GUILD_EMOJI"
    | "ROLE"
    | "USER";
  default?: any;
}

interface MessageData {
  name: string;
  type?: "MESSAGE_COMMAND";
  args: MessageCommandOptionData[];
  description?: string;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
  aliases?: string[];
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
  mode?: "development" | "production";
  admins?: Snowflake[];
  handlers?: HandlersOptions;
  joinThreadsOnCreate?: boolean;
}

//#endregion Interfaces

//#region Types

export type Awaited<T> = T | PromiseLike<T>;

export type CommandData =
  | SlashCommandData
  | ContextMenuUserData
  | ContextMenuMessageData
  | MessageData;

type InhibitorType =
  | "MESSAGE_COMMAND"
  | "APPLICATION_COMMAND"
  | "COMMAND"
  | "BUTTON"
  | "SELECT_MENU"
  | "ALL";

//#endregion Types
