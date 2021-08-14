"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsHandler = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const collection_data_1 = require("collection-data");
class CommandsHandler {
    constructor(client, dir) {
        if (!dir)
            throw new TypeError("Directory must be provided.");
        this.client = client;
        this.dir = dir;
        this.client.commands = new collection_data_1.Collection();
    }
    async registerAll() {
        const baseDir = path_1.join(require.main.path, this.dir);
        const cmds = await this.readDirAndPush(baseDir);
        for (const cmdPath of cmds) {
            const Command = (await Promise.resolve().then(() => require(cmdPath))).default;
            if (!Command)
                continue;
            const instance = new Command(this.client);
            if (!instance.name)
                continue;
            instance.path = cmdPath;
            this.client.commands.set(instance.name, instance);
        }
        return this.client.commands;
    }
    async readDirAndPush(d) {
        const files = [];
        async function read(dir) {
            const data = [];
            const result = await promises_1.readdir(dir);
            for (const item of result) {
                const infos = await promises_1.stat(path_1.join(dir, item));
                if (infos.isDirectory())
                    await read(path_1.join(dir, item));
                else
                    files.push(path_1.join(dir, item));
            }
            return data;
        }
        await read(d);
        return files;
    }
}
exports.CommandsHandler = CommandsHandler;
