"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShewenyClient = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const index_1 = require("./index");
const collection_data_1 = require("collection-data");
class ShewenyClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.handlers = {};
        this.commands = new collection_data_1.Collection();
        this.events = new collection_data_1.Collection();
        this.cooldowns = new collection_data_1.Collection();
        this.shewenyOptions = options;
        if (options.admins)
            this.admins = options.admins;
        if (options.handlers) {
            if (options.handlers.commands) {
                this.handlers.commands = new index_1.CommandsHandler(this, options.handlers.commands);
            }
            if (options.handlers.events) {
                this.handlers.events = new index_1.EventsHandler(this, options.handlers.events.directory);
            }
        }
        this.init();
    }
    async init(dir = path_1.join(__dirname, "./events")) {
        fs_1.readdirSync(dir).forEach(async (file) => {
            const event = await Promise.resolve().then(() => require(`${dir}/${file}`)).then((e) => e.default);
            const evtName = file.split(".")[0];
            this.on(evtName, (...args) => event(this, ...args));
            console.log(`Event loaded: ${evtName}`);
        });
    }
    awaitReady() {
        return new Promise((resolve) => {
            if (this.isReady())
                return resolve();
            const that = this;
            that.once("ready", () => resolve());
        });
    }
}
exports.ShewenyClient = ShewenyClient;
