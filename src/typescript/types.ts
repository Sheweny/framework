import type { SlashCommandData, ContextMenuMessageData, ContextMenuUserData, MessageData } from './interfaces';
import type { CommandType as ConstantCommandType } from '../constants/constants';
/**
 * Commands types
 */
// Type of data option in constructor
export type CommandData = SlashCommandData | ContextMenuUserData | ContextMenuMessageData | MessageData;

// Type of th command structure
export type CommandType =
  | typeof ConstantCommandType.cmdSlash
  | typeof ConstantCommandType.ctxMsg
  | typeof ConstantCommandType.ctxUser
  | typeof ConstantCommandType.cmdMsg;
