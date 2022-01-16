import { getAllIntents, getAllPartials } from '../utils/client-util';
/**
 * Client constants
 */
export const CLIENT_MODE = {
  dev: 'development' as 'development',
  prod: 'production' as 'production',
};
export const CLIENT_UTIL = {
  allIntents: getAllIntents(),
  allPartials: getAllPartials(),
};
/**
 * Command constants
 */
export const COMMAND_TYPE = {
  cmdMsg: 'MESSAGE_COMMAND' as 'MESSAGE_COMMAND',
  cmdSlash: 'SLASH_COMMAND' as 'SLASH_COMMAND',
  ctxMsg: 'CONTEXT_MENU_MESSAGE' as 'CONTEXT_MENU_MESSAGE',
  ctxUser: 'CONTEXT_MENU_USER' as 'CONTEXT_MENU_USER',
};

export const COMMAND_CHANNEL = {
  dm: 'DM' as 'DM',
  global: 'GLOBAL' as 'GLOBAL',
  guild: 'GUILD' as 'GUILD',
};
export const COMMAND_MESSAGE_ARGS_TYPE = {
  string: 'STRING' as 'STRING',
  number: 'NUMBER' as 'NUMBER',
  boolean: 'BOOLEAN' as 'BOOLEAN',
  rest: 'REST' as 'REST',
  guild: 'GUILD' as 'GUILD',
  channel: 'CHANNEL' as 'CHANNEL',
  member: 'MEMBER' as 'MEMBER',
  guild_emoji: 'GUILD_EMOJI' as 'GUILD_EMOJI',
  role: 'ROLE' as 'ROLE',
  user: 'USER' as 'USER',
};
export const COMMAND_PERMISSIONS = {
  admin: 'BOT_ADMIN' as 'BOT_ADMIN',
};
export const COMMAND_EVENTS = {
  userMissingPerm: 'userMissingPermissions' as 'userMissingPermissions',
  clientMissingPerm: 'clientMissingPermissions' as 'clientMissingPermissions',
  cooldownLimit: 'cooldownLimit' as 'cooldownLimit',
};

/**
 * Inhibitor constants
 */
export const INHIBITOR_TYPE = {
  message: 'MESSAGE_COMMAND' as 'MESSAGE_COMMAND',
  appCommand: 'APPLICATION_COMMAND' as 'APPLICATION_COMMAND',
  button: 'BUTTON' as 'BUTTON',
  select: 'SELECT_MENU' as 'SELECT_MENU',
  all: 'ALL' as 'ALL',
};
