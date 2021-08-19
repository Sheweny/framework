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
  Event as Evt,
  Command as Cmd,
  Button as Btn,
  SelectMenu as SM,
} from "../../structures";

// Event structure
export interface Event extends Evt {
  before: Function;
  execute: Function;
}

// Command structure
export interface Command extends Cmd {
  before: Function;
  execute: Function;
}

// Button structure
export interface Button extends Btn {
  before: Function;
  execute: Function;
}

// Select Menu structure
export interface SelectMenu extends SM {
  before: Function;
  execute: Function;
}
