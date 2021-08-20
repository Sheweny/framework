import type { ShewenyClient } from "../..";
export interface ICommandHandlerOptions {
    type?: "SLASH_COMMANDS" | "MESSAGE_COMMANDS";
    directory: string;
    prefix?: string;
}
/**
 * Structures
 */
import type { ButtonInteraction, SelectMenuInteraction, Message, CommandInteraction, ContextMenuInteraction, CommandInteractionOptionResolver } from "discord.js";
import type { Event as Evt, Command as Cmd, Button as Btn, SelectMenu as SM, Inhibitor as Inhib } from "../../structures";
export interface Event extends Evt {
    before: Function;
    execute(...args: any[]): any | Promise<any>;
}
export interface Command extends Cmd {
    before: Function;
    execute(client: ShewenyClient, arg: Message | CommandInteraction, args: string[] | CommandInteractionOptionResolver): any | Promise<any>;
}
export interface Button extends Btn {
    before: Function;
    execute(interaction: ButtonInteraction): any | Promise<any>;
}
export interface SelectMenu extends SM {
    before: Function;
    execute(interaction: SelectMenuInteraction): any | Promise<any>;
}
export interface Inhibitor extends Inhib {
    execute(client: ShewenyClient, arg: Message | CommandInteraction | ButtonInteraction | SelectMenuInteraction | ContextMenuInteraction): any | Promise<any>;
    onFailure(client: ShewenyClient, arg: Message | CommandInteraction | ButtonInteraction | SelectMenuInteraction | ContextMenuInteraction): any | Promise<any>;
}
