import type { ApplicationCommandOptionData, PermissionString } from 'discord.js';
import type { EventEmitter } from 'events';
import type { ClientOptions, Snowflake } from 'discord.js';
import type { ButtonsManager, CommandsManager, EventsManager, InhibitorsManager, SelectMenusManager } from '../managers';
import type { Collection } from 'collection-data';
import type { Button, Command, Event, Inhibitor, SelectMenu } from '../structures';
import type * as Constants from '../constants/constants';
/**
 * Interfaces of managers
 */
export interface BaseManagerOptions {
  directory: string;
  loadAll?: boolean;
}
export interface CommandsManagerOptions extends BaseManagerOptions {
  guildId?: Snowflake | Snowflake[];
  prefix?: string;
  applicationPermissions?: boolean;
  autoRegisterApplicationCommands?: boolean;
}
/**
 * Intrefaces of Commands
 */

//Data option for `SLASH_COMMAND` type
export interface SlashCommandData {
  name: string;
  type: typeof Constants.CommandType.cmdSlash;
  description: string;
  options?: ApplicationCommandOptionData[];
  defaultPermission?: boolean;
  category?: string;
  channel?: typeof Constants.CommandChannel.dm | typeof Constants.CommandChannel.guild;
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

// Data option for `CONTEXT_MENU_USER` type
export interface ContextMenuUserData {
  name: string;
  type: typeof Constants.CommandType.ctxUser;
  description?: string;
  defaultPermission?: boolean;
  category?: string;
  channel?: typeof Constants.CommandChannel.dm | typeof Constants.CommandChannel.guild;
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

// Data option for `CONTEXT_MENU_MESSAGE` type
export interface ContextMenuMessageData {
  name: string;
  type: typeof Constants.CommandType.ctxMsg;
  description?: string;
  defaultPermission?: boolean;
  category?: string;
  channel?: typeof Constants.CommandChannel.dm | typeof Constants.CommandChannel.guild;
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

//  Data option for `MESSAGE_COMMAND` type
export interface MessageData {
  name: string;
  type?: typeof Constants.CommandType.cmdMsg;
  args?: MessageCommandOptionData[];
  description?: string;
  category?: string;
  channel?: typeof Constants.CommandChannel.dm | typeof Constants.CommandChannel.guild;
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
  aliases?: string[];
}

// Data for the arguments message
export interface MessageCommandOptionData {
  name: string;
  type:
    | typeof Constants.CommandMessageArgsType.string
    | typeof Constants.CommandMessageArgsType.number
    | typeof Constants.CommandMessageArgsType.boolean
    | typeof Constants.CommandMessageArgsType.rest
    | typeof Constants.CommandMessageArgsType.guild
    | typeof Constants.CommandMessageArgsType.channel
    | typeof Constants.CommandMessageArgsType.member
    | typeof Constants.CommandMessageArgsType.guild_emoji
    | typeof Constants.CommandMessageArgsType.role
    | typeof Constants.CommandMessageArgsType.user;
  default?: any;
}

// The arguments in execute functions
export interface CommandMessageArgsResolved {
  [index: string]: any;
}

/**
 * Interfaces of events
 */

export interface EventOptions {
  description?: string;
  emitter: EventEmitter;
  once?: boolean;
}

/**
 * Client interfaces
 */

// Options for Sheweny client framework
export interface ShewenyClientOptions extends ClientOptions {
  mode?: typeof Constants.ClientMode.dev | typeof Constants.ClientMode.prod;
  admins?: Snowflake[];
  handlers?: ManagersOptions;
  joinThreadsOnCreate?: boolean;
}

// Managers
export interface Managers {
  commands?: CommandsManager;
  events?: EventsManager;
  buttons?: ButtonsManager;
  selectMenus?: SelectMenusManager;
  inhibitors?: InhibitorsManager;
}

// Collections of managers
export interface ManagersCollections {
  commands?: Collection<string, Command>;
  events?: Collection<string, Event>;
  buttons?: Collection<string[], Button>;
  selectMenus?: Collection<string[], SelectMenu>;
  inhibitors?: Collection<string, Inhibitor>;
}

//Client options for managers
interface ManagersOptions {
  commands?: CommandsManagerOptions;
  events?: BaseManagerOptions;
  buttons?: BaseManagerOptions;
  selectMenus?: BaseManagerOptions;
  inhibitors?: BaseManagerOptions;
}

//#endregion Interfaces
