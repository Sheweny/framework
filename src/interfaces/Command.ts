import type { ApplicationCommandOptionData, PermissionString } from "discord.js";

/**
 * Data option for `SLASH_COMMAND` type
 */
export interface SlashCommandData {
  name: string;
  type: "SLASH_COMMAND";
  description: string;
  options?: ApplicationCommandOptionData[];
  defaultPermission?: boolean;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

/**
 * Data option for `CONTEXT_MENU_USER` type
 */
export interface ContextMenuUserData {
  name: string;
  type: "CONTEXT_MENU_USER";
  description?: string;
  defaultPermission?: boolean;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

/**
 * Data option for `CONTEXT_MENU_MESSAGE` type
 */
export interface ContextMenuMessageData {
  name: string;
  type: "CONTEXT_MENU_MESSAGE";
  description?: string;
  defaultPermission?: boolean;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: number;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

/**
 * Data option for `MESSAGE_COMMAND` type
 */
export interface MessageData {
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

/**
 * Data for the arguments message
 */
export interface MessageCommandOptionData {
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

export interface MessageCommandArgs {
  [index: string]: any;
}

/**
 * Type of data option in constructor
 */
export type CommandData =
  | SlashCommandData
  | ContextMenuUserData
  | ContextMenuMessageData
  | MessageData;

/**
 * Type of th command structure
 */
export type CommandType =
  | "SLASH_COMMAND"
  | "CONTEXT_MENU_MESSAGE"
  | "CONTEXT_MENU_USER"
  | "MESSAGE_COMMAND";
