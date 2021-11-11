/**
 * Client constants
 */
export declare const ClientMode: {
    dev: "development";
    prod: "production";
};
/**
 * Command constants
 */
export declare const CommandType: {
    cmdMsg: "MESSAGE_COMMAND";
    cmdSlash: "SLASH_COMMAND";
    ctxMsg: "CONTEXT_MENU_MESSAGE";
    ctxUser: "CONTEXT_MENU_USER";
};
export declare const CommandChannel: {
    dm: "DM";
    guild: "GUILD";
};
export declare const CommandMessageArgsType: {
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
export declare const CommandPermissions: {
    admin: "BOT_ADMIN";
};
export declare const CommandEvents: {
    userMissingPerm: "userMissingPermissions";
    clientMissingPerm: "clientMissingPermissions";
    cooldownLimit: "cooldownLimit";
};
/**
 * Inhibitor constants
 */
export declare const InhibitorType: {
    message: "MESSAGE_COMMAND";
    appCommand: "APPLICATION_COMMAND";
    button: "BUTTON";
    select: "SELECT_MENU";
    all: "ALL";
};
