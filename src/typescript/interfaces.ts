import type {
  ApplicationCommandOptionData,
  PermissionResolvable,
  Collection,
  ClientOptions,
  Snowflake,
  LocalizationMap,
} from 'discord.js';
import type { EventEmitter } from 'node:events';
import type {
  // Managers
  ButtonsManager,
  CommandsManager,
  EventsManager,
  InhibitorsManager,
  ModalsManager,
  SelectMenusManager,
  // Structures
  Button,
  Command,
  Event,
  Inhibitor,
  SelectMenu,
  Modal,
} from '../index.js';
import type {
  CLIENT_MODE,
  COMMAND_CHANNEL,
  COMMAND_MESSAGE_ARGS_TYPE,
  COMMAND_TYPE,
  INHIBITOR_TYPE,
} from '../constants/constants.js';
import type { CommandManagerRegisterStrategy, CustomId, InhibitorType, MessageCommandPrefix } from './types.js';

/**
 * Interfaces of managers
 */
export interface BaseManagerOptions {
  directory: string;
  asyncRead?: boolean;
}
export interface CommandsManagerOptions extends BaseManagerOptions {
  guildId?: Snowflake | Snowflake[];
  prefix?: MessageCommandPrefix;
  applicationPermissions?: boolean;
  autoRegisterApplicationCommands?: boolean;
  default?: CommandsManagerDefaultOptions;
  registerStrategy?: CommandManagerRegisterStrategy;
}
export interface CommandsManagerDefaultOptions {
  adminOnly?: boolean;
  category?: string;
  channel?: typeof COMMAND_CHANNEL.dm | typeof COMMAND_CHANNEL.global | typeof COMMAND_CHANNEL.guild;
  clientPermissions?: PermissionResolvable[];
  cooldown?: number;
  description?: string;
  descriptionLocalizations?: LocalizationMap;
  examples?: string | string[];
  type?: typeof COMMAND_TYPE.cmdSlash | typeof COMMAND_TYPE.cmdMsg | typeof COMMAND_TYPE.ctxMsg | typeof COMMAND_TYPE.ctxUser;
  usage?: string | string[];
  userPermissions?: PermissionResolvable[];
}
export interface EventsManagerOptions extends BaseManagerOptions {
  default?: EventsManagerDefaultOptions;
}
export interface EventsManagerDefaultOptions {
  emitter?: EventEmitter;
  once?: boolean;
}

export interface InhibitorsManagerOptions extends BaseManagerOptions {
  default?: InhibitorsManagerDefaultOptions;
}
export interface InhibitorsManagerDefaultOptions {
  priority?: number;
  type?:
    | typeof INHIBITOR_TYPE.message[]
    | typeof INHIBITOR_TYPE.appCommand[]
    | typeof INHIBITOR_TYPE.button[]
    | typeof INHIBITOR_TYPE.select[]
    | typeof INHIBITOR_TYPE.all[];
}
export interface ButtonsManagerOptions extends BaseManagerOptions {
  default?: ButtonsManagerDefaultOptions;
}
export interface ButtonsManagerDefaultOptions {
  cooldown?: number;
}
export interface SelectMenusManagerOptions extends BaseManagerOptions {
  default?: SelectMenusManagerDefaultOptions;
}
export interface SelectMenusManagerDefaultOptions {
  cooldown?: number;
}
export interface ModalsManagerOptions extends BaseManagerOptions {
  default?: ModalsManagerDefaultOptions;
}
export interface ModalsManagerDefaultOptions {
  cooldown?: number;
}
// ---------------STRUCTURES-DATA--------------- \\

// COMMAND STRUCTURE
interface BaseCommand {
  name: string;
  description?: string;
  category?: string;
  usage?: string | string[];
  enabled?: boolean;
  examples?: string | string[];
  channel?: typeof COMMAND_CHANNEL.dm | typeof COMMAND_CHANNEL.guild | typeof COMMAND_CHANNEL.global;
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionResolvable[];
  clientPermissions?: PermissionResolvable[];
}
interface BaseApplicationCommand extends BaseCommand {
  nameLocalizations?: LocalizationMap;
  descriptionLocalizations?: LocalizationMap;
}
// Data option for `SLASH_COMMAND` type
export interface SlashCommandData extends BaseApplicationCommand {
  descriptionLocalizations?: LocalizationMap;
  type?: typeof COMMAND_TYPE.cmdSlash;
  options?: ApplicationCommandOptionData[];
}

// Data option for `CONTEXT_MENU_USER` type
export interface ContextMenuUserData extends BaseApplicationCommand {
  type?: typeof COMMAND_TYPE.ctxUser;
}

// Data option for `CONTEXT_MENU_MESSAGE` type
export interface ContextMenuMessageData extends BaseApplicationCommand {
  type?: typeof COMMAND_TYPE.ctxMsg;
}

//  Data option for `MESSAGE_COMMAND` type
export interface MessageData extends BaseCommand {
  type?: typeof COMMAND_TYPE.cmdMsg;
  args?: MessageCommandOptionData[];
  aliases?: string[];
}

// Data for the arguments message
export interface MessageCommandOptionData {
  name: string;
  type:
    | typeof COMMAND_MESSAGE_ARGS_TYPE.string
    | typeof COMMAND_MESSAGE_ARGS_TYPE.number
    | typeof COMMAND_MESSAGE_ARGS_TYPE.boolean
    | typeof COMMAND_MESSAGE_ARGS_TYPE.rest
    | typeof COMMAND_MESSAGE_ARGS_TYPE.guild
    | typeof COMMAND_MESSAGE_ARGS_TYPE.channel
    | typeof COMMAND_MESSAGE_ARGS_TYPE.member
    | typeof COMMAND_MESSAGE_ARGS_TYPE.guild_emoji
    | typeof COMMAND_MESSAGE_ARGS_TYPE.role
    | typeof COMMAND_MESSAGE_ARGS_TYPE.user
    | typeof COMMAND_MESSAGE_ARGS_TYPE.command;
  default?: unknown;
}

// The arguments in execute functions
export interface CommandMessageArgsResolved {
  [index: string]: unknown;
}
// EVENT STRUCTURE
export interface EventData {
  description?: string;
  emitter?: EventEmitter;
  once?: boolean;
}
// BUTTON STRUCTURE
export interface ButtonData {
  enabled?: boolean;
  cooldown?: number;
}
// MODAL STRUCTURE
export interface ModalData {
  enabled?: boolean;
  cooldown?: number;
}
// SELECTMENU STRUCTURE
export interface SelectMenuData {
  enabled?: boolean;
  cooldown?: number;
}
// INHIBITOR STRUCTURE
export interface InhibitorData {
  enabled?: boolean;
  type?: InhibitorType[];
  priority?: number;
}

// ---------------CLIENT--------------- \\

export interface ShewenyClientOptions extends ClientOptions {
  admins?: Snowflake[];
  disableCooldownsForAdmins?: boolean;
  joinThreadsOnCreate?: boolean;
  managers?: ManagersOptions;
  mode?: typeof CLIENT_MODE.dev | typeof CLIENT_MODE.prod;
}

export interface Cooldowns {
  commands: Collection<string, Collection<string, number>>;
  buttons: Collection<CustomId, Collection<string, number>>;
  selectMenus: Collection<CustomId, Collection<string, number>>;
  modals: Collection<CustomId, Collection<string, number>>;
}

// Managers
export interface Managers {
  buttons?: ButtonsManager;
  commands?: CommandsManager;
  events?: EventsManager;
  inhibitors?: InhibitorsManager;
  modals?: ModalsManager;
  selectMenus?: SelectMenusManager;
}

// Collections of managers
export interface ManagersCollections {
  buttons: Collection<CustomId, Button[]>;
  commands: Collection<string, Command[]>;
  events: Collection<string, Event[]>;
  inhibitors: Collection<string, Inhibitor[]>;
  modals: Collection<CustomId, Modal[]>;
  selectMenus: Collection<CustomId, SelectMenu[]>;
}

// Client options for managers
interface ManagersOptions {
  commands?: CommandsManagerOptions;
  events?: EventsManagerOptions;
  buttons?: BaseManagerOptions;
  selectMenus?: BaseManagerOptions;
  modals?: BaseManagerOptions;
  inhibitors?: InhibitorsManagerOptions;
}

// #endregion Interfaces
