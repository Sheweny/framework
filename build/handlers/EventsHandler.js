"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsHandler = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const collection_data_1 = require("collection-data");
class EventsHandler {
    constructor(client, dir) {
        if (!dir)
            throw new TypeError("Directory must be provided.");
        this.client = client;
        this.dir = dir;
        this.client.events = new collection_data_1.Collection();
    }
    async registerAll() {
        const baseDir = path_1.join(require.main.path, this.dir);
        const evtsPaths = await this.readDirAndPush(baseDir);
        for (const evtPath of evtsPaths) {
            const Event = (await Promise.resolve().then(() => require(evtPath))).default;
            if (!Event)
                continue;
            const instance = new Event(this.client);
            if (!instance.name)
                continue;
            instance.path = evtPath;
            this.client.events.set(instance.name, instance);
        }
        return this.client.events;
    }
    async loadAll() {
        if (!this.client.events)
            await this.registerAll();
        for (const [name, evt] of this.client.events) {
            this.client.on(name, (...args) => evt.execute(args));
        }
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
exports.EventsHandler = EventsHandler;
