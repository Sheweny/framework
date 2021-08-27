/// <reference types="node" />
declare module "utils/readDirFiles" {
    export function readDirAndPush(d: string): Promise<string[]>;
}
declare module "managers/ButtonsManager" {
    import { Collection } from "collection-data";
    import type { ShewenyClient, Button } from "index";
    export class ButtonsManager {
        private client;
        directory: string;
        buttons?: Collection<string[], Button>;
        constructor(client: ShewenyClient, directory: string, loadAll?: boolean);
        loadAll(): Promise<Collection<string[], Button>>;
    }
}
declare module "managers/CommandsManager" {
    import { Collection } from "collection-data";
    import type { Collection as CollectionDjs, ApplicationCommand, ApplicationCommandData, ApplicationCommandResolvable, GuildResolvable } from "discord.js";
    import { EventEmitter } from "events";
    import type { ShewenyClient, Command } from "index";
    interface CommandsManagerOptions {
        guildId?: string;
        prefix?: string;
    }
    export class CommandsManager extends EventEmitter {
        private client;
        directory: string;
        private guildId?;
        prefix?: string;
        commands?: Collection<string, Command>;
        constructor(client: ShewenyClient, directory: string, loadAll?: boolean, options?: CommandsManagerOptions);
        loadAll(): Promise<Collection<string, Command>>;
        loadAndRegisterAll(): Promise<void>;
        private renameCommandType;
        getData(commands?: Collection<string, Command> | Command | undefined): ApplicationCommandData[] | ApplicationCommandData | undefined;
        registerAllApplicationCommands(commands?: Collection<string, Command> | undefined, guildId?: string): Promise<CollectionDjs<string, ApplicationCommand<{}>> | CollectionDjs<string, ApplicationCommand<{
            guild: GuildResolvable;
        }>> | undefined>;
        createCommand(command: Command, guildId?: string): Promise<ApplicationCommand<{}> | ApplicationCommand<{
            guild: GuildResolvable;
        }> | undefined>;
        editCommand(oldCommand: ApplicationCommandResolvable, newCommand: Command, guildId?: string): Promise<ApplicationCommand<{}> | ApplicationCommand<{
            guild: GuildResolvable;
        }> | undefined>;
        deleteCommand(command: ApplicationCommandResolvable, guildId?: string): Promise<ApplicationCommand<{
            guild: GuildResolvable;
        }> | null | undefined>;
        deleteAllCommands(guildId?: string): Promise<CollectionDjs<string, ApplicationCommand<{}>> | CollectionDjs<string, ApplicationCommand<{
            guild: GuildResolvable;
        }>> | undefined>;
    }
}
declare module "managers/EventsManager" {
    import { Collection } from "collection-data";
    import type { ShewenyClient, Event } from "index";
    import type { ClientEvents } from "discord.js";
    export class EventsManager {
        private client;
        directory: string;
        events?: Collection<keyof ClientEvents, Event>;
        constructor(client: ShewenyClient, directory: string, loadAll?: boolean);
        loadAll(): Promise<Collection<keyof ClientEvents, Event>>;
        registerAll(events?: Collection<keyof ClientEvents, Event> | undefined): Promise<void>;
        loadAndRegisterAll(): Promise<void>;
    }
}
declare module "managers/InhibitorsManager" {
    import { Collection } from "collection-data";
    import type { ShewenyClient, Inhibitor } from "index";
    export class InhibitorsManager {
        private client;
        directory: string;
        inhibitors?: Collection<string, Inhibitor>;
        constructor(client: ShewenyClient, directory: string, loadAll?: boolean);
        loadAll(): Promise<Collection<string, Inhibitor>>;
    }
}
declare module "managers/SelectMenusManager" {
    import { Collection } from "collection-data";
    import type { ShewenyClient, SelectMenu } from "index";
    export class SelectMenusManager {
        private client;
        directory: string;
        selectMenus?: Collection<string[], SelectMenu>;
        constructor(client: ShewenyClient, directory: string, loadAll?: boolean);
        loadAll(): Promise<Collection<string[], SelectMenu>>;
    }
}
declare module "managers/index" {
    export { ButtonsManager } from "managers/ButtonsManager";
    export { CommandsManager } from "managers/CommandsManager";
    export { EventsManager } from "managers/EventsManager";
    export { InhibitorsManager } from "managers/InhibitorsManager";
    export { SelectMenusManager } from "managers/SelectMenusManager";
}
declare module "structures/BaseStructure" {
    import type { ShewenyClient } from "index";
    /**
     * Represent a Base of any structure
     * @class BaseStructure
     * @abstract
     */
    export abstract class BaseStructure {
        client: ShewenyClient;
        path?: string;
        constructor(client: ShewenyClient, path?: string);
    }
}
declare module "structures/Button" {
    import type { ButtonInteraction } from "discord.js";
    import type { ShewenyClient } from "client/Client";
    import { Collection } from "collection-data";
    import { BaseStructure } from "structures/index";
    export abstract class Button extends BaseStructure {
        customId: string[];
        constructor(client: ShewenyClient, customId: string[]);
        before?(interaction: ButtonInteraction): any | Promise<any>;
        abstract execute(interaction: ButtonInteraction): any | Promise<any>;
        /**
         * Unregister a button
         * @public
         * @returns {boolean}
         */
        unregister(): boolean;
        /**
         * Reload a button
         * @public
         * @async
         * @returns {Promise<Collection<string[], Button> | null>} The buttons collection
         */
        reload(): Promise<Collection<string[], Button> | null>;
        /**
         * Register a button
         * @public
         * @async
         * @returns {Collection<string[], Button>} The buttons collection
         */
        register(): Promise<Collection<string[], Button>>;
    }
}
declare module "interfaces/Command" {
    import { ApplicationCommandOptionData, PermissionString } from "discord.js";
    interface SlashCommandData {
        name: string;
        type: "SLASH_COMMAND";
        description: string;
        options?: ApplicationCommandOptionData[];
        defaultPermission?: boolean;
        category?: string;
        channel?: "GUILD" | "DM";
        cooldown?: number;
        adminsOnly?: boolean;
        userPermissions?: PermissionString[];
        clientPermissions?: PermissionString[];
    }
    interface ContextMenuUserData {
        name: string;
        type: "CONTEXT_MENU_USER";
        description?: string;
        defaultPermission?: boolean;
        category?: string;
        channel?: "GUILD" | "DM";
        cooldown?: number;
        adminsOnly?: boolean;
        userPermissions?: PermissionString[];
        clientPermissions?: PermissionString[];
    }
    interface ContextMenuMessageData {
        name: string;
        type: "CONTEXT_MENU_MESSAGE";
        description?: string;
        defaultPermission?: boolean;
        category?: string;
        channel?: "GUILD" | "DM";
        cooldown?: null;
        adminsOnly?: boolean;
        userPermissions?: PermissionString[];
        clientPermissions?: PermissionString[];
    }
    interface MessageData {
        name: string;
        type: "MESSAGE_COMMAND";
        args: MessageCommandOptionData[];
        description?: string;
        category?: string;
        channel?: "GUILD" | "DM";
        cooldown?: number;
        adminsOnly?: boolean;
        userPermissions?: PermissionString[];
        clientPermissions?: PermissionString[];
        aliases?: string[];
    }
    export interface MessageCommandOptionData {
        name: string;
        type: "STRING" | "NUMBER" | "BOOLEAN" | "REST" | "GUILD" | "CHANNEL" | "MEMBER" | "GUILD_EMOJI" | "ROLE" | "USER";
        default?: any;
    }
    export interface MessageCommandArgs {
        [index: string]: any;
    }
    export type CommandData = SlashCommandData | ContextMenuUserData | ContextMenuMessageData | MessageData;
}
declare module "structures/Command" {
    import { Collection } from "collection-data";
    import { BaseStructure } from "structures/index";
    import type { ShewenyClient } from "client/Client";
    import type { CommandData, MessageCommandOptionData, MessageCommandArgs } from "interfaces/Command";
    import type { ApplicationCommandOptionData, CommandInteraction, ContextMenuInteraction, Message, PermissionString } from "discord.js";
    export abstract class Command extends BaseStructure {
        name: string;
        description?: string;
        type: "SLASH_COMMAND" | "CONTEXT_MENU_MESSAGE" | "CONTEXT_MENU_USER" | "MESSAGE_COMMAND";
        defaultPermission?: boolean;
        options?: ApplicationCommandOptionData[];
        args?: MessageCommandOptionData[];
        category: string;
        channel?: "GUILD" | "DM";
        cooldown: number;
        adminsOnly: boolean;
        userPermissions: PermissionString[];
        clientPermissions: PermissionString[];
        aliases?: string[];
        cooldowns: Collection<string, Collection<string, number>>;
        constructor(client: ShewenyClient, data: CommandData);
        before?(interaction: CommandInteraction | ContextMenuInteraction | Message, args?: MessageCommandArgs[]): any | Promise<any>;
        abstract execute(interaction: CommandInteraction | ContextMenuInteraction | Message, args?: MessageCommandArgs[]): //args?: MessageCommandArgs
        any | Promise<any>;
        /**
         * Unregister a application command
         * @public
         * @returns {boolean}
         */
        unregister(): boolean;
        /**
         * Reload a Application Command
         * @public
         * @async
         * @returns {Promise<Collection<string, Command> | null>} The Application Commands collection
         */
        reload(): Promise<Collection<string, Command> | null>;
        /**
         * Register a Application Command
         * @public
         * @async
         * @returns {Collection<string, ApplicationCommand>} The Application Commands collection
         */
        register(): Promise<Collection<string, Command>>;
    }
}
declare module "structures/Event" {
    import { Collection } from "collection-data";
    import { BaseStructure } from "structures/index";
    import type { ClientEvents } from "discord.js";
    import type { ShewenyClient } from "client/Client";
    interface EventOptions {
        description?: string;
        once?: boolean;
    }
    export abstract class Event extends BaseStructure {
        name: keyof ClientEvents;
        description: string;
        once: boolean;
        constructor(client: ShewenyClient, name: keyof ClientEvents, options?: EventOptions);
        before?(...args: any[]): any | Promise<any>;
        abstract execute(...args: any[]): any | Promise<any>;
        /**
         * Unregister a event
         * @public
         * @returns {boolean}
         */
        unregister(): boolean;
        /**
         * Reload a event
         * @public
         * @async
         * @returns {Promise<Collection<string, Event> | null>} The events collection
         */
        reload(): Promise<Collection<string, Event> | null>;
        /**
         * Register a event
         * @public
         * @async
         * @returns {Promise<Collection<string, Event>>} The events collection
         */
        register(): Promise<Collection<string, Event>>;
    }
}
declare module "structures/Inhibitor" {
    import { Collection } from "collection-data";
    import { BaseStructure } from "structures/index";
    import type { ShewenyClient } from "client/Client";
    type InhibitorType = "MESSAGE_COMMAND" | "APPLICATION_COMMAND" | "BUTTON" | "SELECT_MENU" | "ALL";
    interface InhibitorOptions {
        type?: InhibitorType[];
        priority?: number;
    }
    export abstract class Inhibitor extends BaseStructure {
        name: string;
        type: InhibitorType[];
        priority: number;
        constructor(client: ShewenyClient, name: string, options?: InhibitorOptions);
        abstract onFailure(...args: any[]): any | Promise<any>;
        abstract execute(...args: any[]): any | Promise<any>;
        /**
         * Unregister a inhibitor
         * @public
         * @returns {boolean}
         */
        unregister(): boolean;
        /**
         * Reload a inhibitor
         * @public
         * @async
         * @returns {Promise<Collection<string[], Inhibitor> | null>} The inhibitors collection
         */
        reload(): Promise<Collection<string, Inhibitor> | null>;
        /**
         * Register a inhibitor
         * @public
         * @async
         * @returns {Collection<string[], Inhibitor>} The inhibitors collection
         */
        register(): Promise<Collection<string, Inhibitor>>;
    }
}
declare module "structures/SelectMenu" {
    import { Collection } from "collection-data";
    import { BaseStructure } from "structures/index";
    import type { SelectMenuInteraction } from "discord.js";
    import type { ShewenyClient } from "client/Client";
    export abstract class SelectMenu extends BaseStructure {
        customId: string[];
        constructor(client: ShewenyClient, customId: string[]);
        before?(interaction: SelectMenuInteraction): any | Promise<any>;
        abstract execute(interaction: SelectMenuInteraction): any | Promise<any>;
        /**
         * Unregister a select menu
         * @public
         * @returns {boolean}
         */
        unregister(): boolean;
        /**
         * Reload a select menu
         * @public
         * @async
         * @returns {Promise<Collection<string[], SelectMenu> | null>} The select menus collection
         */
        reload(): Promise<Collection<string[], SelectMenu> | null>;
        /**
         * Register a select menu
         * @public
         * @async
         * @returns {Collection<string[], SelectMenu>} The select menus collection
         */
        register(): Promise<Collection<string[], SelectMenu>>;
    }
}
declare module "structures/index" {
    export { BaseStructure } from "structures/BaseStructure";
    export { Button } from "structures/Button";
    export { Command } from "structures/Command";
    export { Event } from "structures/Event";
    export { Inhibitor } from "structures/Inhibitor";
    export { SelectMenu } from "structures/SelectMenu";
}
declare module "interfaces/Handlers" {
    import type { ClientEvents } from "discord.js";
    import type { Collection } from "collection-data";
    import type { ButtonsManager, CommandsManager, EventsManager, InhibitorsManager, SelectMenusManager } from "managers/index";
    import type { Button, Command, Event, Inhibitor, SelectMenu } from "structures/index";
    interface ApplicationCommandsOptions {
        type: "applications";
        directory: string;
        guildId?: string;
    }
    export interface Handler {
        collections: HandlersCollections;
        manager: HandlersManager;
    }
    export interface HandlersCollections {
        commands?: Collection<string, Command>;
        events?: Collection<keyof ClientEvents, Event>;
        buttons?: Collection<string[], Button>;
        selectMenus?: Collection<string[], SelectMenu>;
        inhibitors?: Collection<string, Inhibitor>;
    }
    export interface HandlersManager {
        commands?: CommandsManager;
        events?: EventsManager;
        buttons?: ButtonsManager;
        selectMenus?: SelectMenusManager;
        inhibitors?: InhibitorsManager;
    }
    export interface HandlersOptions {
        commands?: CommandsOptions;
        events?: {
            directory: string;
        };
        buttons?: {
            directory: string;
        };
        selectMenus?: {
            directory: string;
        };
        inhibitors?: {
            directory: string;
        };
    }
    interface MessageCommandsOptions {
        type: "messages";
        directory: string;
        prefix: string;
    }
    export type CommandsOptions = MessageCommandsOptions | ApplicationCommandsOptions;
}
declare module "interfaces/Client" {
    import { ClientOptions, Snowflake } from "discord.js";
    import { HandlersOptions } from "interfaces/Handlers";
    export interface ShewenyClientOptions extends ClientOptions {
        admins?: Snowflake[];
        handlers?: HandlersOptions;
    }
}
declare module "client/Client" {
    import { Client } from "discord.js";
    import type { HandlersManager, HandlersCollections } from "interfaces/Handlers";
    import { DiscordResolve } from "@sheweny/resolve";
    import type { Snowflake, ClientOptions } from "discord.js";
    import type { ShewenyClientOptions } from "interfaces/Client";
    export class ShewenyClient extends Client {
        admins: Snowflake[];
        handlers: HandlersManager;
        collections: HandlersCollections;
        util: DiscordResolve;
        constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions);
        awaitReady(): Promise<unknown>;
    }
}
declare module "index" {
    export { ShewenyClient } from "client/Client";
    export { BaseStructure, Button, Command, Event, Inhibitor, SelectMenu, } from "structures/index";
    export { ButtonsManager, CommandsManager, EventsManager, InhibitorsManager, SelectMenusManager, } from "managers/index";
}
declare module "events/interactionButtonCreate" {
    import type { ButtonInteraction } from "discord.js";
    import type { ShewenyClient } from "client/Client";
    export default function run(client: ShewenyClient, interaction: ButtonInteraction): Promise<any>;
}
declare module "events/interactionCommandCreate" {
    import type { CommandInteraction, ContextMenuInteraction } from "discord.js";
    import type { ShewenyClient } from "index";
    export default function run(client: ShewenyClient, interaction: CommandInteraction | ContextMenuInteraction): Promise<any>;
}
declare module "events/interactionCreate" {
    import type { Interaction } from "discord.js";
    import type { ShewenyClient } from "client/Client";
    export default function run(client: ShewenyClient, interaction: Interaction): boolean;
}
declare module "events/interactionSelectMenuCreate" {
    import type { SelectMenuInteraction } from "discord.js";
    import type { ShewenyClient } from "client/Client";
    export default function run(client: ShewenyClient, interaction: SelectMenuInteraction): Promise<any>;
}
declare module "events/messageCreate" {
    import type { Message } from "discord.js";
    import type { ShewenyClient } from "client/Client";
    export default function run(client: ShewenyClient, message: Message): Promise<any>;
}
