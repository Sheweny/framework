/// <reference types="node" />
import type { ApplicationCommandOptionData, PermissionString, Collection } from 'discord.js';
import type { EventEmitter } from 'events';
import type { ClientOptions, Snowflake } from 'discord.js';
import type { ButtonsManager, CommandsManager, EventsManager, InhibitorsManager, SelectMenusManager } from '../managers';
import type { Button, Command, Event, Inhibitor, SelectMenu } from '../structures';
import type { CLIENT_MODE, COMMAND_CHANNEL, COMMAND_MESSAGE_ARGS_TYPE, COMMAND_TYPE } from '../constants/constants';
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
export interface SlashCommandData {
    name: string;
    type: typeof COMMAND_TYPE.cmdSlash;
    description: string;
    options?: ApplicationCommandOptionData[];
    defaultPermission?: boolean;
    category?: string;
    usage?: string | string[];
    examples?: string | string[];
    channel?: typeof COMMAND_CHANNEL.dm | typeof COMMAND_CHANNEL.guild;
    cooldown?: number;
    adminsOnly?: boolean;
    userPermissions?: PermissionString[];
    clientPermissions?: PermissionString[];
}
export interface ContextMenuUserData {
    name: string;
    type: typeof COMMAND_TYPE.ctxUser;
    description?: string;
    defaultPermission?: boolean;
    category?: string;
    usage?: string | string[];
    examples?: string | string[];
    channel?: typeof COMMAND_CHANNEL.dm | typeof COMMAND_CHANNEL.guild;
    cooldown?: number;
    adminsOnly?: boolean;
    userPermissions?: PermissionString[];
    clientPermissions?: PermissionString[];
}
export interface ContextMenuMessageData {
    name: string;
    type: typeof COMMAND_TYPE.ctxMsg;
    description?: string;
    defaultPermission?: boolean;
    category?: string;
    usage?: string | string[];
    examples?: string | string[];
    channel?: typeof COMMAND_CHANNEL.dm | typeof COMMAND_CHANNEL.guild;
    cooldown?: number;
    adminsOnly?: boolean;
    userPermissions?: PermissionString[];
    clientPermissions?: PermissionString[];
}
export interface MessageData {
    name: string;
    type?: typeof COMMAND_TYPE.cmdMsg;
    args?: MessageCommandOptionData[];
    description?: string;
    category?: string;
    usage?: string | string[];
    examples?: string | string[];
    channel?: typeof COMMAND_CHANNEL.dm | typeof COMMAND_CHANNEL.guild;
    cooldown?: number;
    adminsOnly?: boolean;
    userPermissions?: PermissionString[];
    clientPermissions?: PermissionString[];
    aliases?: string[];
}
export interface MessageCommandOptionData {
    name: string;
    type: typeof COMMAND_MESSAGE_ARGS_TYPE.string | typeof COMMAND_MESSAGE_ARGS_TYPE.number | typeof COMMAND_MESSAGE_ARGS_TYPE.boolean | typeof COMMAND_MESSAGE_ARGS_TYPE.rest | typeof COMMAND_MESSAGE_ARGS_TYPE.guild | typeof COMMAND_MESSAGE_ARGS_TYPE.channel | typeof COMMAND_MESSAGE_ARGS_TYPE.member | typeof COMMAND_MESSAGE_ARGS_TYPE.guild_emoji | typeof COMMAND_MESSAGE_ARGS_TYPE.role | typeof COMMAND_MESSAGE_ARGS_TYPE.user;
    default?: any;
}
export interface CommandMessageArgsResolved {
    [index: string]: any;
}
/**
 * Interfaces of events
 */
export interface EventOptions {
    description?: string;
    emitter?: EventEmitter;
    once?: boolean;
}
/**
 * Client interfaces
 */
export interface ShewenyClientOptions extends ClientOptions {
    mode?: typeof CLIENT_MODE.dev | typeof CLIENT_MODE.prod;
    admins?: Snowflake[];
    managers?: ManagersOptions;
    joinThreadsOnCreate?: boolean;
}
export interface Managers {
    commands?: CommandsManager;
    events?: EventsManager;
    buttons?: ButtonsManager;
    selectMenus?: SelectMenusManager;
    inhibitors?: InhibitorsManager;
}
export interface ManagersCollections {
    commands: Collection<string, Command>;
    events: Collection<string, Event>;
    buttons: Collection<string[] | RegExp[], Button>;
    selectMenus: Collection<string[] | RegExp[], SelectMenu>;
    inhibitors: Collection<string, Inhibitor>;
}
interface ManagersOptions {
    commands?: CommandsManagerOptions;
    events?: BaseManagerOptions;
    buttons?: BaseManagerOptions;
    selectMenus?: BaseManagerOptions;
    inhibitors?: BaseManagerOptions;
}
/**
 * loadFiles function
 */
export interface LoadFilesOptions {
    directory: string;
    key: string;
}
export {};
