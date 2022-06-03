import type { SlashCommandData, ContextMenuMessageData, ContextMenuUserData, MessageData } from './interfaces';
import type { COMMAND_TYPE, INHIBITOR_TYPE } from '../constants/constants';

/** **** UTIL ******/
export type CustomId = Array<string | RegExp>;

/**
 * Commands types
 */
// Type of data option in constructor
export type CommandData = SlashCommandData | ContextMenuUserData | ContextMenuMessageData | MessageData;

// Type of th command structure
export type CommandType =
  | typeof COMMAND_TYPE.cmdSlash
  | typeof COMMAND_TYPE.ctxMsg
  | typeof COMMAND_TYPE.ctxUser
  | typeof COMMAND_TYPE.cmdMsg;

/**
 * Inhibitors types
 */
export type InhibitorType =
  | typeof INHIBITOR_TYPE.message
  | typeof INHIBITOR_TYPE.appCommand
  | typeof INHIBITOR_TYPE.button
  | typeof INHIBITOR_TYPE.select
  | typeof INHIBITOR_TYPE.modal
  | typeof INHIBITOR_TYPE.all;
