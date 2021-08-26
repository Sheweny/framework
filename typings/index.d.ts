import type {
  ApplicationCommand,
  ApplicationCommandData,
  ApplicationCommandOptionData,
  ApplicationCommandResolvable,
  ButtonInteraction,
  Client,
  ClientEvents,
  ClientOptions,
  Collection,
  GuildResolvable,
  PermissionString,
  SelectMenuInteraction,
  Snowflake,
} from "discord.js";

//#region Classes

export abstract class Button {
  public constructor(client: ShewenyClient, customId: string[]);

  public client: ShewenyClient;
  public path: string;
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

export abstract class Command {
  public constructor(client: ShewenyClient, data: CommandData);

  public client: ShewenyClient;
  public path: string;
  public name: string;
  public type: "SLASH_COMMAND" | "CONTEXT_MENU_MESSAGE" | "CONTEXT_MENU_USER" | "MESSAGE";
  public defaultPermission?: boolean;
  public options?: ApplicationCommandOptionData[];
  public category?: string;
  public channel?: "GUILD" | "DM";
  public cooldown?: null;
  public adminsOnly?: boolean;
  public userPermissions?: PermissionString[];
  public clientPermissions?: PermissionString[];

  before?(...args: any[]): any | Promise<any>;
  abstract execute(...args: any[]): any | Promise<any>;
}

export class CommandsManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  private directory: string;
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
    | Collection<string, ApplicationCommand<{}>>
    | Collection<string, ApplicationCommand<{ guild: GuildResolvable }>>
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
    | Collection<string, ApplicationCommand<{}>>
    | Collection<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  >;
}

export abstract class Event {
  public constructor(
    client: ShewenyClient,
    name: keyof ClientEvents,
    options?: EventOptions
  );

  public client: ShewenyClient;
  public path: string;
  public name: keyof ClientEvents;
  public description: string;
  public once: boolean;

  before?(...args: any[]): any | Promise<any>;
  abstract execute(...args: any[]): any | Promise<any>;
}

export class EventsManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  private directory: string;
  public events: Collection<keyof ClientEvents, Event>;

  public loadAll(): Promise<Collection<keyof ClientEvents, Event>>;
  public registerAll(events?: Collection<keyof ClientEvents, Event>): Promise<void>;
}

export abstract class Inhibitor {
  public constructor(client: ShewenyClient, name: string, options?: InhibitorOptions);

  public client: ShewenyClient;
  public path?: string;
  public name: string;
  public type: InhibitorType[];
  public priority: number;

  abstract onFailure(...args: any[]): any | Promise<any>;
  abstract execute(...args: any[]): any | Promise<any>;
}

export class InhibitorsManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  public directory: string;
  public inhibitors?: Collection<string, Inhibitor>;

  public loadAll(): Promise<Collection<string, Inhibitor>>;
}

export abstract class SelectMenu {
  public constructor(client: ShewenyClient, customId: string[]);

  public client: ShewenyClient;
  public path: string;
  public customId: string[];

  before?(interaction: SelectMenuInteraction): any | Promise<any>;
  abstract execute(interaction: SelectMenuInteraction): any | Promise<any>;
}

export class SelectMenusManager {
  public constructor(client: ShewenyClient, directory: string, loadAll?: boolean);

  private client: ShewenyClient;
  public directory: string;
  public selectMenus?: Collection<string[], SelectMenu>;

  public loadAll(): Promise<Collection<string[], SelectMenu>>;
}

export class ShewenyClient extends Client {
  public constructor(options: ShewenyClientOptions);

  public admins: Snowflake[];
  public handlers: Handler;
}

//#endregion Classes

//#region Interfaces

interface ApplicationCommands {
  type: "applications";
  directory: string;
  guildId?: string;
}

interface ContextMenuMessageData {
  name: string;
  type: "CONTEXT_MENU_MESSAGE";
  defaultPermission?: boolean;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: null;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

interface ContextMenuUserData {
  name: string;
  type: "CONTEXT_MENU_USER";
  defaultPermission?: boolean;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: null;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

interface EventOptions {
  description?: string;
  once?: boolean;
}

interface Handler {
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
  inhibitors?: Collection<string, Inhibitor>;
}

interface HandlersManager {
  commands: CommandsManager;
  events?: EventsManager;
  interactions: {
    buttons?: ButtonsManager;
    selectMenus?: SelectMenusManager;
  };
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
  cooldown?: null;
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
  cooldown?: null;
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
