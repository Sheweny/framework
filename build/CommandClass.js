"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(client, options) {
        this.sheweny = client;
        this.emojis = this.sheweny.emojis;
        this.colors = this.sheweny.colors;
        this.util = this.sheweny.util;
        this.db = this.sheweny.db;
        this.name = options.name;
        this.aliases = options.aliases;
        this.options = options.options;
        this.category = options.category;
        this.description = options.description;
        this.cooldown = options.cooldown;
        this.userPermissions = options.userPermissions;
        this.botPermissions = options.botPermissions;
        this.subCommands = options.subCommands;
    }
}
exports.default = Command;
