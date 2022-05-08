"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsManager = void 0;
const discord_js_1 = require("discord.js");
const _1 = require(".");
const loadFiles_1 = require("../utils/loadFiles");
const constants_1 = require("../constants/constants");
const helpers_1 = require("../helpers");
/**
 * Manager for Commands
 * @extends {EventEmitter}
 */
class CommandsManager extends _1.BaseManager {
    /**
     * Constructor to manage commands
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the commands folder
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
        if (options?.loadAll)
            this.loadAndRegisterAll();
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
        const commands = await (0, loadFiles_1.loadFiles)(this.client, {
            directory: this.directory,
            key: 'name',
        });
        if (commands)
            this.client.collections.commands = commands;
        this.commands = commands;
        new helpers_1.ShewenyInformation(this.client, `- Commands loaded : ${this.client.collections.commands.size}`);
        return commands;
    }
    /**
     * Load all and Register Application commands
     * @returns {Promise<void>}
     */
    async loadAndRegisterAll() {
        const commands = await this.loadAll();
        const commandsToRegister = commands?.filter((cmd) => 
        // eslint-disable-next-line
        // @ts-ignore
        [constants_1.COMMAND_TYPE.cmdSlash, constants_1.COMMAND_TYPE.ctxMsg, constants_1.COMMAND_TYPE.ctxUser].includes(cmd.type));
        if (commandsToRegister && this.autoRegisterApplicationCommands)
            await this.registerApplicationCommands(commandsToRegister);
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
            if (this.applicationPermissions)
                await this.registerPermissions(cmds, this.commands, guildId);
            return cmds;
        }
        return undefined;
    }
    /**
     * Set permissions for each commands in guild
     * @param {Collection<string, ApplicationCommand<{}>> | undefined} [applicationCommands] Commands coming from the client's application
     * @param {Collection<string, Command> | undefined} [commandsCollection] Commands coming from the collection of the commands
     * @param {Snowflake | undefined} [guildId] Guild ID where permissions will be set
     * @returns {Promise<void>}
     */
    async registerPermissions(applicationCommands = this.client.application
        ?.commands.cache, commandsCollection = this.commands, guildId) {
        if (!applicationCommands)
            throw new ReferenceError('Commands of application must be provided');
        if (!commandsCollection)
            throw new ReferenceError('Commands of client must be provided');
        if (!guildId)
            throw new ReferenceError('Guild ID must be provided');
        if (typeof guildId !== 'string')
            throw new TypeError('Guild ID must be a string');
        const guild = this.client.guilds.cache.get(guildId);
        const getRoles = (command) => {
            if (!command.userPermissions?.length)
                return null;
            return guild?.roles.cache.filter(r => r.permissions.has(command.userPermissions));
        };
        const fullPermissions = [];
        for (const [, appCommand] of applicationCommands) {
            const permissions = [];
            if (commandsCollection.get(appCommand.name)?.adminsOnly) {
                // Bot admin permissions
                if (this.client.admins?.length) {
                    for (const userId of this.client.admins) {
                        permissions.push({
                            id: userId,
                            type: discord_js_1.EnumResolvers.resolveApplicationCommandPermissionType('USER'),
                            permission: true,
                        });
                    }
                }
            }
            else {
                const command = commandsCollection.get(appCommand.name);
                if (!command)
                    continue;
                // Guild permissions
                const roles = getRoles(command);
                // Roles in the guild
                if (roles && roles.size) {
                    for (const [, role] of roles) {
                        permissions.push({
                            id: role.id,
                            type: discord_js_1.EnumResolvers.resolveApplicationCommandPermissionType('ROLE'),
                            permission: true,
                        });
                    }
                }
                // Owner of the guild
                if (guild?.ownerId) {
                    permissions.push({
                        id: guild.ownerId,
                        type: discord_js_1.EnumResolvers.resolveApplicationCommandPermissionType('USER'),
                        permission: true,
                    });
                }
                // Bot addmins for adminsOnly permission
            }
            fullPermissions.push({
                id: appCommand.id,
                permissions,
            });
        }
        await guild?.commands.permissions.set({ fullPermissions });
    }
    /**
     * Rename command type to the type of Application command
     * @param {"SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"} type Type of command
     * @returns {ApplicationCommandType | undefined}
     */
    renameCommandType(type) {
        if (type === constants_1.COMMAND_TYPE.cmdSlash)
            return discord_js_1.EnumResolvers.resolveApplicationCommandType('CHAT_INPUT');
        if (type === constants_1.COMMAND_TYPE.ctxMsg)
            return discord_js_1.EnumResolvers.resolveApplicationCommandType('MESSAGE');
        if (type === constants_1.COMMAND_TYPE.ctxUser)
            return discord_js_1.EnumResolvers.resolveApplicationCommandType('USER');
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