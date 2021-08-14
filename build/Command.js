"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(client, name, options) {
        this.aliases = [];
        this.options = [];
        this.category = 'Bot';
        this.cooldown = 0;
        this.userPermissions = [];
        this.botPermissions = [];
        this.subCommands = [];
        this.client = client;
        this.util = this.client.util;
        this.name = name;
        this.aliases = options.aliases;
        this.options = options.options;
        this.category = options.category;
        this.description = options.description;
        this.cooldown = options.cooldown;
        this.userPermissions = options.userPermissions;
        this.botPermissions = options.botPermissions;
        this.subCommands = options.subCommands;
    }
    before() {
    }
    unregister() {
        this.client.commands.delete(this.name);
        delete require.cache[require.resolve(this.path)];
        return true;
    }
    async reload() {
        if (this.path) {
            this.unregister();
            return this.register();
        }
        return null;
    }
    async register() {
        const Command = (await Promise.resolve().then(() => require(this.path))).default;
        const cmd = new Command(this.client);
        return this.client.commands.set(cmd.name, cmd);
    }
}
exports.Command = Command;
