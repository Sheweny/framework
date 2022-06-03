"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsManager = void 0;
const discord_js_1 = require("discord.js");
const _1 = require(".");
const constants_1 = require("../constants/constants");
const helpers_1 = require("../helpers");
const Loader_1 = require("../utils/Loader");
/**
 * Manager for Commands
 * @extends {EventEmitter}
 */
class CommandsManager extends _1.BaseManager {
    /**
     * Constructor to manage commands
     * @param {ShewenyClient} client Client framework
     * @param {CommandsManagerOptions} [options] Options of the commands manager
     */
    constructor(client, options) {
        super(client, options);
        this.applicationPermissions = options?.applicationPermissions || false;
        this.autoRegisterApplicationCommands = options?.autoRegisterApplicationCommands || false;
        this.default = {
            adminOnly: options.default?.adminOnly,
            category: options.default?.category,
            channel: options.default?.channel,
            clientPermissions: options.default?.clientPermissions,
            cooldown: options.default?.cooldown,
            examples: options.default?.examples,
            type: options.default?.type,
            usage: options.default?.usage,
            userPermissions: options.default?.userPermissions,
        };
        this.guildId = options?.guildId;
        this.prefix = options?.prefix;
    }
    /**
     * Create a command in the client's application commands
     * @param {Command} command Command to create
     * @param {Snowflake | undefined} [guildId] Guild ID where the order will be created
     * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
     */
    async createCommand(command, guildId) {
        if (!command)
            throw new Error('Command not found');
        const data = this.getApplicationCommandData(command);
        if (!data)
            return undefined;
        return guildId ? this.client.application?.commands.create(data, guildId) : this.client.application?.commands.create(data);
    }
    /**
     * Delete all commands from the client's application commands
     * @param {Snowflake | undefined} [guildId] Guild ID where all commands will be deleted
     * @returns {Promise<Collection<string, ApplicationCommand<{}>> | Collection<string, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
     */
    async deleteAllCommands(guildId) {
        return guildId ? this.client.application?.commands.set([], guildId) : this.client.application?.commands.set([]);
    }
    /**
     * Removes an command from the client's application commands
     * @param {ApplicationCommandResolvable} command Command deleted
     * @param {Snowflake | undefined} [guildId] Guild ID where the command will be deleted
     * @returns {Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined>}
     */
    async deleteCommand(command, guildId) {
        if (!command)
            throw new Error('Command not found');
        return guildId
            ? this.client.application?.commands.delete(command, guildId)
            : this.client.application?.commands.delete(command);
    }
    /**
     * Edit an command with a new command in the client's application commands
     * @param {ApplicationCommandResolvable} oldCommand Command edited
     * @param {Command} newCommand The new command that will take the place of the old one
     * @param {Snowflake | undefined} [guildId] Guild ID where the order will be edited
     * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
     */
    async editCommand(oldCommand, newCommand, guildId) {
        if (!oldCommand)
            throw new Error('Old Command not found');
        if (!newCommand)
            throw new Error('New Command not found');
        const data = this.getApplicationCommandData(newCommand);
        if (!data)
            return undefined;
        return guildId
            ? this.client.application?.commands.edit(oldCommand, data, guildId)
            : this.client.application?.commands.edit(oldCommand, data);
    }
    /**
     * Get data of Application Command
     * @param {Collection<string, Command> | Command | undefined} [commands] The command(s) to obtain their data
     * @returns {ApplicationCommandData[] | ApplicationCommandData | undefined}
     */
    getApplicationCommandData(commands = this.commands) {
        if (!commands)
            throw new Error('Commands not found');
        if (commands instanceof discord_js_1.Collection) {
            const data = [];
            for (const [, cmd] of commands) {
                if (cmd.type === constants_1.COMMAND_TYPE.cmdMsg)
                    continue;
                const newType = this.renameCommandType(cmd.type);
                if (!newType)
                    continue;
                if (cmd.type === constants_1.COMMAND_TYPE.cmdSlash) {
                    data.push({
                        type: newType,
                        name: cmd.name,
                        description: cmd.description,
                        options: cmd.options,
                        defaultPermission: this.applicationPermissions && this.guildId && (cmd.userPermissions?.length > 0 || cmd.adminsOnly)
                            ? false
                            : cmd.defaultPermission,
                    });
                }
                else if (cmd.type === constants_1.COMMAND_TYPE.ctxMsg || cmd.type === constants_1.COMMAND_TYPE.ctxUser) {
                    // eslint-disable-next-line
                    // @ts-ignore
                    data.push({
                        type: newType,
                        name: cmd.name,
                        // description : A context menu command doesn't have a description
                        defaultPermission: this.applicationPermissions && this.guildId && (cmd.userPermissions?.length > 0 || cmd.adminsOnly)
                            ? false
                            : cmd.defaultPermission,
                    });
                }
            }
            return data;
        }
        else {
            if (commands.type === constants_1.COMMAND_TYPE.cmdMsg)
                return null;
            const newType = this.renameCommandType(commands.type);
            if (!newType)
                return null;
            if (commands.type === constants_1.COMMAND_TYPE.cmdSlash) {
                return {
                    type: newType,
                    name: commands.name,
                    description: commands.description,
                    options: commands.options,
                    defaultPermission: this.applicationPermissions && this.guildId && commands.userPermissions.length > 0
                        ? false
                        : commands.defaultPermission,
                };
            }
            else if (commands.type === constants_1.COMMAND_TYPE.ctxMsg || commands.type === constants_1.COMMAND_TYPE.ctxUser) {
                return {
                    type: newType,
                    name: commands.name,
                    defaultPermission: this.applicationPermissions && this.guildId && commands.userPermissions.length > 0
                        ? false
                        : commands.defaultPermission,
                };
            }
        }
        return null;
    }
    /**
     * Load all commands in collection
     * @returns {Promise<Collection<string, Command>>}
     */
    async loadAll() {
        const loader = new Loader_1.Loader(this.client, this.directory, "name");
        this.commands = await loader.load();
        new helpers_1.ShewenyInformation(this.client, `- Commands loaded : ${this.commands.size}`);
        // Register
        const commandsToRegister = this.commands?.filter((cmd) => cmd.type == constants_1.COMMAND_TYPE.cmdSlash ||
            cmd.type == constants_1.COMMAND_TYPE.ctxMsg ||
            cmd.type == constants_1.COMMAND_TYPE.ctxUser);
        if (commandsToRegister && this.autoRegisterApplicationCommands)
            await this.registerApplicationCommands(commandsToRegister);
        return this.commands;
    }
    /**
     * Set all application commands from the collection of commands in the client application
     * @param {Collection<string, Command> | undefined} [commands] Collection of the commands
     * @returns {Promise<Collection<Snowflake, ApplicationCommand<{}>> | Collection<Snowflake, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
     */
    async registerApplicationCommands(commands = this.commands, guildId = this.guildId) {
        if (guildId && guildId instanceof Array)
            return guildId.every(id => this.registerApplicationCommands(commands, id));
        if (!commands)
            throw new Error('Commands not found');
        const data = this.getApplicationCommandData();
        await this.client.awaitReady();
        if (data instanceof Array && data.length > 0) {
            const cmds = guildId && typeof guildId === 'string'
                ? await this.client.application?.commands.set(data, guildId)
                : await this.client.application?.commands.set(data);
            return cmds;
        }
        return undefined;
    }
    /**
     * Rename command type to the type of Application command
     * @param {"SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"} type Type of command
     * @returns {ApplicationCommandType | undefined}
     */
    renameCommandType(type) {
        if (type === constants_1.COMMAND_TYPE.cmdSlash)
            return discord_js_1.ApplicationCommandType.ChatInput;
        if (type === constants_1.COMMAND_TYPE.ctxMsg)
            return discord_js_1.ApplicationCommandType.Message;
        if (type === constants_1.COMMAND_TYPE.ctxUser)
            return discord_js_1.ApplicationCommandType.User;
        return undefined;
    }
    /**
     * Unload all commands
     * @returns {void}
     */
    unloadAll() {
        this.commands = null;
        this.client.collections.commands.clear();
    }
}
exports.CommandsManager = CommandsManager;
