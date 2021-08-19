export interface ICommandHandlerOptions {
    type?: "SLASH_COMMANDS" | "MESSAGE_COMMANDS";
    directory: string;
    prefix?: string;
}
/**
 * Structures
 */
import type { Event as Evt, Command as Cmd, Button as Btn, SelectMenu as SM } from "../../structures";
export interface Event extends Evt {
    before: Function;
    execute: Function;
}
export interface Command extends Cmd {
    before: Function;
    execute: Function;
}
export interface Button extends Btn {
    before: Function;
    execute: Function;
}
export interface SelectMenu extends SM {
    before: Function;
    execute: Function;
}
