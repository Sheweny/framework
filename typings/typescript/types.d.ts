import type { SlashCommandData, ContextMenuMessageData, ContextMenuUserData, MessageData } from './interfaces';
import type { CommandType as ConstantCommandType, InhibitorType as ConstantInhibitorType } from '../constants/constants';
/**
 * Commands types
 */
export declare type CommandData = SlashCommandData | ContextMenuUserData | ContextMenuMessageData | MessageData;
export declare type CommandType = typeof ConstantCommandType.cmdSlash | typeof ConstantCommandType.ctxMsg | typeof ConstantCommandType.ctxUser | typeof ConstantCommandType.cmdMsg;
/**
 * Inhibitors types
 */
export declare type InhibitorType = typeof ConstantInhibitorType.message | typeof ConstantInhibitorType.appCommand | typeof ConstantInhibitorType.button | typeof ConstantInhibitorType.select | typeof ConstantInhibitorType.all;
