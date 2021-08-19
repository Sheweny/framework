export interface ICommandHandlerOptions {
    type?: "SLASH_COMMANDS" | "MESSAGE_COMMANDS";
    directory: string;
    prefix?: string;
}
/**
 * Structures
 */
import { ButtonInteraction, SelectMenuInteraction } from "discord.js";
import type { Event as Evt, Command as Cmd, Button as Btn, SelectMenu as SM } from "../../structures";
export interface Event extends Evt {
    before: Function;
    execute(...args: any[]): any | Promise<any>;
}
export interface Command extends Cmd {
    before: Function;
    execute(arg: any, args: any): any | Promise<any>;
}
export interface Button extends Btn {
    before: Function;
    execute(interaction: ButtonInteraction): any | Promise<any>;
}
export interface SelectMenu extends SM {
    before: Function;
    execute(interaction: SelectMenuInteraction): any | Promise<any>;
}
