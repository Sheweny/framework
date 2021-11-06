/**
 * Command constants
 */
export declare const enum CommandType {
    cmdMsg = "MESSAGE_COMMAND",
    cmdSlash = "SLASH_COMMAND",
    ctxMsg = "CONTEXT_MENU_MESSAGE",
    ctxUser = "CONTEXT_MENU_USER"
}
export declare const enum CommandChannel {
    dm = "DM",
    guild = "GUILD"
}
/**
 * Event constants
 */
export declare const enum FrameworkEventEmitter {
    'CLIENT' = "client",
    'COMMAND_MANAGER' = "commandManager"
}
/**
 * Inhibitor constants
 */
export declare const enum InhibitorType {
    message = "MESSAGE_COMMAND",
    appCommand = "APPLICATION_COMMAND",
    button = "BUTTON",
    select = "SELECT_MENU",
    all = "ALL"
}
