import type { ClientOptions } from 'discord.js';
import type { CommandsHandler, EventsHandler } from '../../index';
export interface IOptions extends ClientOptions {
    handlers?: IOptionsHandlers;
    admins?: string[];
}
export interface IOptionsHandlers {
    commands?: {
        type?: 'SLASH_COMMANDS' | 'MESSAGE_COMMANDS';
        directory: string;
    };
    events?: {
        directory: string;
    };
}
export interface IClientHandlers {
    commands?: CommandsHandler;
    events?: EventsHandler;
}
