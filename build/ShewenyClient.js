"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShewenyClient = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
class ShewenyClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.shewenyOptions = options;
        // if (options.handlers) {
        // if (options.handlers.commands) {
        // 	this.handleCommands(options.handlers.commands)
        // }
        // if (options.handlers.events) {
        // 	this.handleEvents(options.handlers.events)
        // }
        // }
        this.init();
    }
    async init(dir = path_1.join(__dirname, "./events")) {
        fs_1.readdirSync(dir).forEach(async (file) => {
            const event = await Promise.resolve().then(() => require(`${dir}/${file}`)).then(e => e.default);
            const evtName = file.split(".")[0];
            this.on(evtName, (...args) => event(this, ...args));
            console.log(`Event loaded: ${evtName}`);
        });
    }
    ;
}
exports.ShewenyClient = ShewenyClient;
