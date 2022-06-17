import type { SlashCommandData, ContextMenuMessageData, ContextMenuUserData, MessageData } from './interfaces';
import type { COMMAND_TYPE, INHIBITOR_TYPE } from '../constants/constants';
/**
 * Commands types
 */
export declare type CommandData = SlashCommandData | ContextMenuUserData | ContextMenuMessageData | MessageData;
export declare type CommandType = typeof COMMAND_TYPE.cmdSlash | typeof COMMAND_TYPE.ctxMsg | typeof COMMAND_TYPE.ctxUser | typeof COMMAND_TYPE.cmdMsg;
/**
 * Inhibitors types
 */
export declare type InhibitorType = typeof INHIBITOR_TYPE.message | typeof INHIBITOR_TYPE.appCommand | typeof INHIBITOR_TYPE.button | typeof INHIBITOR_TYPE.select | typeof INHIBITOR_TYPE.all;
