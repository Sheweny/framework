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
  dm: 'DM',
  guild: 'GUILD',
};

/**
 * Inhibitor constants
 */
export const InhibitorType = {
  message: 'MESSAGE_COMMAND',
  appCommand: 'APPLICATION_COMMAND',
  button: 'BUTTON',
  select: 'SELECT_MENU',
  all: 'ALL',
};
