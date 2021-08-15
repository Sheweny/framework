import type { Collection } from 'collection-data';
import type { ApplicationCommandResolvable } from 'discord.js';
import type { ShewenyClient, Command } from '../index';
export declare class SlashHandler {
    private commands;
    private client;
    constructor(client: ShewenyClient);
    getData(commands: Collection<string, Command>): any;
    registerCommands(commands?: Collection<string, any>, guildId?: string): Promise<import("discord.js").Collection<string, import("discord.js").ApplicationCommand<{}>>>;
    createCommand(command: Command, guildId?: string): Promise<import("discord.js").ApplicationCommand<{
        guild: import("discord.js").GuildResolvable;
    }>>;
    editCommand(oldCmd: ApplicationCommandResolvable, newCmd: Command, guildId?: string): Promise<import("discord.js").ApplicationCommand<{
        guild: import("discord.js").GuildResolvable;
    }>>;
    deleteCommand(oldCmd: ApplicationCommandResolvable, guildId?: string): Promise<import("discord.js").ApplicationCommand<{
        guild: import("discord.js").GuildResolvable;
    }>>;
    deleteAllCommands(guildId?: string): Promise<import("discord.js").Collection<string, import("discord.js").ApplicationCommand<{}>>>;
}
