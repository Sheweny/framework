/**
 * Client constants
 */
export const CLIENT_MODE = {
	dev: 'development' as const,
	prod: 'production' as const,
};

/**
 * Command constants
 */
export const COMMAND_TYPE = {
	cmdMsg: 'MESSAGE_COMMAND' as const,
	cmdSlash: (('SLASH_COMMAND' || 'CHAT_INPUT') as 'SLASH_COMMAND') || 'CHAT_INPUT',
	ctxMsg: (('CONTEXT_MENU_MESSAGE' || 'MESSAGE') as 'CONTEXT_MENU_MESSAGE') || 'MESSAGE',
	ctxUser: (('CONTEXT_MENU_USER' || 'USER') as 'CONTEXT_MENU_USER') || 'USER',
};

export const COMMAND_CHANNEL = {
	dm: 'DM' as const,
	global: 'GLOBAL' as const,
	guild: 'GUILD' as const,
};
export const COMMAND_MESSAGE_ARGS_TYPE = {
	string: 'STRING' as const,
	number: 'NUMBER' as const,
	boolean: 'BOOLEAN' as const,
	rest: 'REST' as const,
	guild: 'GUILD' as const,
	channel: 'CHANNEL' as const,
	member: 'MEMBER' as const,
	guild_emoji: 'GUILD_EMOJI' as const,
	role: 'ROLE' as const,
	user: 'USER' as const,
};
export const COMMAND_PERMISSIONS = {
	admin: 'BOT_ADMIN' as const,
};
export const COMMAND_EVENTS = {
	userMissingPerm: 'userMissingPermissions' as const,
	clientMissingPerm: 'clientMissingPermissions' as const,
	cooldownLimit: 'cooldownLimit' as const,
};

/**
 * Inhibitor constants
 */
export const INHIBITOR_TYPE = {
	message: 'MESSAGE_COMMAND' as const,
	appCommand: 'APPLICATION_COMMAND' as const,
	button: 'BUTTON' as const,
	select: 'SELECT_MENU' as const,
	all: 'ALL' as const,
};
