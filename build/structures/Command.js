"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const discord_js_1 = require("discord.js");
const _1 = require(".");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants/constants");
/**
 * Represents an Command structure
 * @extends {BaseStructure}
 */
class Command extends _1.BaseStructure {
    /**
     * Constructor for build a Command
     * @param {ShewenyClient} client Client framework
     * @param {CommandData} data Data for build a Command
     */
    constructor(client, data) {
        super(client);
        const defaultData = client.managers.commands?.default || {};
        const type = data.type || defaultData.type || constants_1.COMMAND_TYPE.cmdMsg;
        this.adminsOnly = (data.adminsOnly || defaultData.adminOnly) ?? false;
        this.aliases = this.isType(type, constants_1.COMMAND_TYPE.cmdMsg) ? data.aliases : [];
        this.args = this.isType(type, constants_1.COMMAND_TYPE.cmdMsg) ? data.args : undefined;
        this.category = (data.category || defaultData.category) ?? '';
        this.channel = data.channel || defaultData.channel;
        this.clientPermissions = (data.clientPermissions || defaultData.clientPermissions) ?? [];
        this.cooldown = (data.cooldown || defaultData.cooldown) ?? 0;
        this.defaultPermission = this.isType(type, constants_1.COMMAND_TYPE.cmdSlash, constants_1.COMMAND_TYPE.ctxUser, constants_1.COMMAND_TYPE.ctxMsg)
            ? data.defaultPermission
            : undefined;
        this.description = (data.description || defaultData.description) ?? '';
        this.examples = data.examples || defaultData.examples;
        this.manager = this.client.managers.commands;
        this.name = data.name;
        this.options = this.isType(type, constants_1.COMMAND_TYPE.cmdSlash) ? data.options : undefined;
        this.type = type;
        this.usage = data.usage || defaultData.usage;
        this.userPermissions = (data.userPermissions || defaultData.userPermissions) ?? [];
    }
    /**
     * Check the type of a command
     * @param type - Type of a command
     * @param types - Types allowed
     * @returns {boolean}
     */
    isType(type, ...types) {
        if (types.includes(type))
            return true;
        return false;
    }
    /**
     * Register a command in collections
     * @returns {Collection<string, ApplicationCommand>} The Application Commands collection
     */
    async register() {
        if (!this.path)
            return new helpers_1.ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Command', this.name);
        const CommandImported = (await Promise.resolve().then(() => require(this.path))).default;
        const AC = new CommandImported(this.client);
        return this.client.collections.commands
            ? this.client.collections.commands.set(AC.name, AC)
            : new discord_js_1.Collection().set(AC.name, AC);
    }
    /**
     * Reload a command
     * @returns {Promise<Collection<string, Command> | ShewenyError>} The Application Commands collection
     */
    async reload() {
        this.unregister();
        return this.register();
    }
    /**
     * Unregister a command from collections
     * @returns {boolean}
     */
    unregister() {
        this.client.collections.commands?.delete(this.name);
        if (!this.path)
            return false;
        delete require.cache[require.resolve(this.path)];
        return true;
    }
}
exports.Command = Command;
