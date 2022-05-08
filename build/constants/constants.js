"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INHIBITOR_TYPE = exports.MODAL_EVENTS = exports.SELECT_EVENTS = exports.BUTTON_EVENTS = exports.COMMAND_EVENTS = exports.COMMAND_PERMISSIONS = exports.COMMAND_MESSAGE_ARGS_TYPE = exports.COMMAND_CHANNEL = exports.COMMAND_TYPE = exports.CLIENT_MODE = void 0;
/**
 * Client constants
 */
exports.CLIENT_MODE = {
    dev: 'development',
    prod: 'production',
};
/**
 * Command constants
 */
exports.COMMAND_TYPE = {
    cmdMsg: 'MESSAGE_COMMAND',
    cmdSlash: ('SLASH_COMMAND' || 'CHAT_INPUT') || 'CHAT_INPUT',
    ctxMsg: ('CONTEXT_MENU_MESSAGE' || 'MESSAGE') || 'MESSAGE',
    ctxUser: ('CONTEXT_MENU_USER' || 'USER') || 'USER',
};
exports.COMMAND_CHANNEL = {
    dm: 'DM',
    global: 'GLOBAL',
    guild: 'GUILD',
};
exports.COMMAND_MESSAGE_ARGS_TYPE = {
    string: 'STRING',
    number: 'NUMBER',
    boolean: 'BOOLEAN',
    rest: 'REST',
    guild: 'GUILD',
    channel: 'CHANNEL',
    member: 'MEMBER',
    guild_emoji: 'GUILD_EMOJI',
    role: 'ROLE',
    user: 'USER',
    command: 'COMMAND',
};
exports.COMMAND_PERMISSIONS = {
    admin: 'BOT_ADMIN',
};
exports.COMMAND_EVENTS = {
    userMissingPerm: 'userMissingPermissions',
    clientMissingPerm: 'clientMissingPermissions',
    cooldownLimit: 'cooldownLimit',
    invalidChannel: 'invalidChannel'
};
exports.BUTTON_EVENTS = {
    cooldownLimit: 'cooldownLimit',
};
exports.SELECT_EVENTS = {
    cooldownLimit: 'cooldownLimit',
};
exports.MODAL_EVENTS = {
    cooldownLimit: 'cooldownLimit',
};
/**
 * Inhibitor constants
 */
exports.INHIBITOR_TYPE = {
    message: 'MESSAGE_COMMAND',
    appCommand: 'APPLICATION_COMMAND',
    button: 'BUTTON',
    select: 'SELECT_MENU',
    modal: 'MODAL',
    all: 'ALL',
};
