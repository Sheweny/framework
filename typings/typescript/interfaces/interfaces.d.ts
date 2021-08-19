export interface ICommandHandlerOptions {
    type?: "SLASH_COMMANDS" | "MESSAGE_COMMANDS";
    directory: string;
    prefix?: string;
}
/**
 * Structures
 */
import type { Event as Evt } from "../../structures/Event";
export interface Event extends Evt {
    before: Function;
    execute: Function;
}
import type { Command as Cmd } from "../../structures/Command";
export interface Command extends Cmd {
    before: Function;
    execute: Function;
}
import { Button as Btn } from "../../structures/Button";
export interface Button extends Btn {
    before: Function;
    execute: Function;
}
import { SelectMenu as SM } from "../../structures/SelectMenu";
export interface SelectMenu extends SM {
    before: Function;
    execute: Function;
}
