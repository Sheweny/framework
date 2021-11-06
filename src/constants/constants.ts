/**
 * Client constants
 */
export const ClientMode = {
  dev: 'development' as 'development',
  prod: 'production' as 'production',
};
/**
 * Command constants
 */
export const CommandType = {
  cmdMsg: 'MESSAGE_COMMAND' as 'MESSAGE_COMMAND',
  cmdSlash: 'SLASH_COMMAND' as 'SLASH_COMMAND',
  ctxMsg: 'CONTEXT_MENU_MESSAGE' as 'CONTEXT_MENU_MESSAGE',
  ctxUser: 'CONTEXT_MENU_USER' as 'CONTEXT_MENU_USER',
};

export const CommandChannel = {
  dm: 'DM' as 'DM',
  guild: 'GUILD' as 'GUILD',
};
export const CommandMessageArgsType = {
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

/**
 * Inhibitor constants
 */
export const InhibitorType = {
  message: 'MESSAGE_COMMAND' as 'MESSAGE_COMMAND',
  appCommand: 'APPLICATION_COMMAND' as 'APPLICATION_COMMAND',
  button: 'BUTTON' as 'BUTTON',
  select: 'SELECT_MENU' as 'SELECT_MENU',
  all: 'ALL' as 'ALL',
};
