import type { ApplicationCommandOptionData, PermissionString } from 'discord.js';
import type { EventEmitter } from 'events';
import type { ClientOptions, Snowflake } from 'discord.js';
import type { ButtonsManager, CommandsManager, EventsManager, InhibitorsManager, SelectMenusManager } from '../managers';
import type { Collection } from 'collection-data';
import type { Button, Command, Event, Inhibitor, SelectMenu } from '../structures';
import type * as Constants from '../constants/constants';
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
  channel?: 'GUILD' | 'DM';
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
  channel?: 'GUILD' | 'DM';
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
  channel?: 'GUILD' | 'DM';
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
  channel?: 'GUILD' | 'DM';
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
  aliases?: string[];
}

// Data for the arguments message
export interface MessageCommandOptionData {
  name: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'REST' | 'GUILD' | 'CHANNEL' | 'MEMBER' | 'GUILD_EMOJI' | 'ROLE' | 'USER';
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
  mode?: 'production' | 'development';
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
interface CommandsManagerOptions {
  directory: string;
  guildId?: Snowflake;
  prefix?: string;
  applicationPermissions?: boolean;
}
//#endregion Interfaces
