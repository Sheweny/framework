import {
  ApplicationCommandOptionData,
  PermissionString,
  ApplicationCommandPermissionData,
} from "discord.js";

interface SlashCommandData {
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

interface ContextMenuUserData {
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

interface ContextMenuMessageData {
  name: string;
  type: "CONTEXT_MENU_MESSAGE";
  description?: string;
  defaultPermission?: boolean;
  category?: string;
  channel?: "GUILD" | "DM";
  cooldown?: null;
  adminsOnly?: boolean;
  userPermissions?: PermissionString[];
  clientPermissions?: PermissionString[];
}

interface MessageData {
  name: string;
  type: "MESSAGE_COMMAND";
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
export type CommandData =
  | SlashCommandData
  | ContextMenuUserData
  | ContextMenuMessageData
  | MessageData;
