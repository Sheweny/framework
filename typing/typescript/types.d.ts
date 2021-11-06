import type { SlashCommandData, ContextMenuMessageData, ContextMenuUserData, MessageData } from './interfaces';
import type { CommandType as ConstantCommandType } from '../constants/constants';
/**
 * Commands types
 */
export declare type CommandData = SlashCommandData | ContextMenuUserData | ContextMenuMessageData | MessageData;
export declare type CommandType = typeof ConstantCommandType.cmdSlash | typeof ConstantCommandType.ctxMsg | typeof ConstantCommandType.ctxUser | typeof ConstantCommandType.cmdMsg;
