"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function run(client, thread) {
    if (client.joinThreadsOnCreate && thread.joinable && thread.type !== discord_js_1.ChannelType.GuildPrivateThread) {
        await thread.join();
    }
}
exports.default = run;
