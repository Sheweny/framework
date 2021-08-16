"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsHandler = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const collection_data_1 = require("collection-data");
const index_1 = require("../index");
class CommandsHandler {
    constructor(client, options) {
        if (!options.directory)
            throw new TypeError("Directory must be provided.");
        if (options.type && !['MESSAGE_COMMANDS', 'SLASH_COMMANDS'].includes(options.type))
            throw new TypeError("Unknown type of command: " + options.type + "\nThe type must be MESSAGE_COMMANDS or SLASH_COMMANDS");
        if (!options.type)
            options.type = 'MESSAGE_COMMANDS';
        this.client = client;
        this.dir = options.directory;
        this.client.commands = new collection_data_1.Collection();
        this.client.commandsType = options.type;
        this.options = options;
    }
    async loadAll() {
        const baseDir = path_1.join(require.main.path, this.dir);
        const cmds = await this.readDirAndPush(baseDir);
        for (const cmdPath of cmds) {
            const commandImport = (await Promise.resolve().then(() => require(cmdPath)));
            const key = Object.keys(commandImport)[0];
            const Command = commandImport[key];
            if (!Command)
                continue;
            console.log('-----------------');
            const instance = new Command(this.client);
            if (!instance.name)
                continue;
            instance.path = cmdPath;
            this.client.commands.set(instance.name, instance);
        }
        if (this.options.type === 'SLASH_COMMANDS') {
            this.slashCommands = new index_1.SlashHandler(this.client);
        }
        return this.client.commands;
    }
    async readDirAndPush(d) {
        const files = [];
        async function read(dir) {
            const result = await promises_1.readdir(dir);
            for (const item of result) {
                const infos = await promises_1.stat(path_1.join(dir, item));
                if (infos.isDirectory())
                    await read(path_1.join(dir, item));
                else
                    files.push(path_1.join(dir, item));
            }
            return;
        }
        await read(d);
        return files;
    }
}
exports.CommandsHandler = CommandsHandler;
