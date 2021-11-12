/**
 * Client constants
 */
export declare const CLIENT_MODE: {
    dev: "development";
    prod: "production";
};
export declare const CLIENT_UTIL: {
    allIntents: import("discord.js").Intents;
    allPartials: import("discord.js").PartialTypes[];
};
/**
 * Command constants
 */
export declare const COMMAND_TYPE: {
    cmdMsg: "MESSAGE_COMMAND";
    cmdSlash: "SLASH_COMMAND";
    ctxMsg: "CONTEXT_MENU_MESSAGE";
    ctxUser: "CONTEXT_MENU_USER";
};
export declare const COMMAND_CHANNEL: {
    dm: "DM";
    guild: "GUILD";
};
export declare const COMMAND_MESSAGE_ARGS_TYPE: {
    string: "STRING";
    number: "NUMBER";
    boolean: "BOOLEAN";
    rest: "REST";
    guild: "GUILD";
    channel: "CHANNEL";
    member: "MEMBER";
    guild_emoji: "GUILD_EMOJI";
    role: "ROLE";
    user: "USER";
};
export declare const COMMAND_PERMISSIONS: {
    admin: "BOT_ADMIN";
};
export declare const COMMAND_EVENTS: {
    userMissingPerm: "userMissingPermissions";
    clientMissingPerm: "clientMissingPermissions";
    cooldownLimit: "cooldownLimit";
};
/**
 * Inhibitor constants
 */
export declare const INHIBITOR_TYPE: {
    message: "MESSAGE_COMMAND";
    appCommand: "APPLICATION_COMMAND";
    button: "BUTTON";
    select: "SELECT_MENU";
    all: "ALL";
};
