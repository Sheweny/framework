"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(client, name, options) {
        this.aliases = [];
        this.category = "Bot";
        this.cooldown = 0;
        this.userPermissions = [];
        this.botPermissions = [];
        this.subCommands = [];
        this.client = client;
        this.guildOnly = options.guildOnly || false;
        this.DMOnly = options.DMOnly || false;
        this.name = name;
        this.description = options.description;
        this.type = options.type;
        if (options.aliases)
            this.aliases = options.aliases;
        this.options = options.options;
        this.category = options.category;
        if (options.cooldown)
            this.cooldown = options.cooldown;
        if (options.userPermissions)
            this.userPermissions = options.userPermissions;
        if (options.botPermissions)
            this.botPermissions = options.botPermissions;
        if (options.subCommands)
            this.subCommands = options.subCommands;
        this.defaultPermission = options.defaultPermission;
    }
    unregister() {
        this.client.commands?.delete(this.name);
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
        return this.client.commands?.set(cmd.name, cmd);
    }
}
exports.Command = Command;
