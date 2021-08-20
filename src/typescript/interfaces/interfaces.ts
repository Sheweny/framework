import type { ShewenyClient } from "../..";
// Options for commands handler
export interface ICommandHandlerOptions {
  type?: "SLASH_COMMANDS" | "MESSAGE_COMMANDS";
  directory: string;
  prefix?: string;
}

/**
 * Structures
 */
import type {
  ButtonInteraction,
  SelectMenuInteraction,
  Message,
  CommandInteraction,
} from "discord.js";
import type {
  Event as Evt,
  Command as Cmd,
  Button as Btn,
  SelectMenu as SM,
  Inhibitor as Inhib,
} from "../../structures";

// Event structure
export interface Event extends Evt {
  before: Function;
  execute(...args: any[]): any | Promise<any>;
}

// Command structure
export interface Command extends Cmd {
  before: Function;
  // fix
  execute(client: ShewenyClient, arg: Message | CommandInteraction): any | Promise<any>;
}

// Button structure
export interface Button extends Btn {
  before: Function;
  execute(interaction: ButtonInteraction): any | Promise<any>;
}

// Select Menu structure
export interface SelectMenu extends SM {
  before: Function;
  execute(interaction: SelectMenuInteraction): any | Promise<any>;
}

// Inhibitor structure
export interface Inhibitor extends Inhib {
  execute(arg: SelectMenuInteraction): any | Promise<any>;
}
