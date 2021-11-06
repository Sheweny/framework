/// <reference types="node" />
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
export interface MessageCommandOptionData {
    name: string;
    type: typeof Constants.CommandMessageArgsType.string | typeof Constants.CommandMessageArgsType.number | typeof Constants.CommandMessageArgsType.boolean | typeof Constants.CommandMessageArgsType.rest | typeof Constants.CommandMessageArgsType.guild | typeof Constants.CommandMessageArgsType.channel | typeof Constants.CommandMessageArgsType.member | typeof Constants.CommandMessageArgsType.guild_emoji | typeof Constants.CommandMessageArgsType.role | typeof Constants.CommandMessageArgsType.user;
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
    emitter: EventEmitter;
    once?: boolean;
}
/**
 * Client interfaces
 */
export interface ShewenyClientOptions extends ClientOptions {
    mode?: typeof Constants.ClientMode.dev | typeof Constants.ClientMode.prod;
    admins?: Snowflake[];
    handlers?: ManagersOptions;
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
    commands?: Collection<string, Command>;
    events?: Collection<string, Event>;
    buttons?: Collection<string[], Button>;
    selectMenus?: Collection<string[], SelectMenu>;
    inhibitors?: Collection<string, Inhibitor>;
}
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
export interface CommandsManagerOptions {
    directory: string;
    guildId?: Snowflake | Snowflake[];
    prefix?: string;
    loadAll?: boolean;
    applicationPermissions?: boolean;
}
export {};
