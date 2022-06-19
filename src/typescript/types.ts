import type { SlashCommandData, ContextMenuMessageData, ContextMenuUserData, MessageData } from './interfaces';
import type { COMMAND_TYPE, INHIBITOR_TYPE } from '../constants/constants.js';
import type {
  ButtonsManager,
  CommandsManager,
  EventsManager,
  InhibitorsManager,
  ModalsManager,
  SelectMenusManager,
} from '../managers/index.js';
import type { Button, Command, Event, Inhibitor, SelectMenu, Modal } from '../structures';
import type { Message } from 'discord.js';
import type { Awaitable } from './utilityTypes';

/** **** UTIL ******/
export type CustomId = Array<string | RegExp>;

// Managers
export type Manager = ButtonsManager | CommandsManager | EventsManager | InhibitorsManager | ModalsManager | SelectMenusManager;
// Structures
export type Structure = Button | Command | Event | Inhibitor | Modal | SelectMenu;
/**
 * Commands types
 */
// Type of data option in constructor
export type CommandData = SlashCommandData | ContextMenuUserData | ContextMenuMessageData | MessageData;
export type MessageCommandPrefix = string | ((msg: Message) => Awaitable<string>)

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
