import type { ClientOptions } from "discord.js";
import type { CommandsHandler, EventsHandler, ButtonsHandler } from "../../index";
import { ICommandHandlerOptions } from "./CommandHandler";

export interface IShewenyClientOptions extends ClientOptions {
  handlers?: IOptionsHandlers;
  admins?: string[];
}

export interface IOptionsHandlers {
  commands?: ICommandHandlerOptions;
  events?: {
    directory: string;
  };
  buttons?: {
    directory: string;
  };
}

export interface IClientHandlers {
  commands?: CommandsHandler;
  events?: EventsHandler;
  buttons?: ButtonsHandler;
}
