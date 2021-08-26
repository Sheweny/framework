import { ApplicationCommandOptionData } from "discord.js";

interface SlashCommandData {
  name: string;
  description: string;
  type?: "SLASH_COMMAND";
  options?: ApplicationCommandOptionData[];
  defaultPermission?: boolean;
}

interface ContextMenuUserData {
  name: string;
  type?: "CONTEXT_MENU_USER";
  defaultPermission?: boolean;
}

interface ContextMenuMessageData {
  name: string;
  type?: "CONTEXT_MENU_MESSAGE";
  defaultPermission?: boolean;
}

interface MessageData {
  name: string;
  type?: "MESSAGE";
}

export type CommandData =
  | SlashCommandData
  | ContextMenuUserData
  | ContextMenuMessageData
  | MessageData;
