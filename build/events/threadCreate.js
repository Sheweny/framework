"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function run(client, thread) {
    if (client.joinThreadsOnCreate && thread.joinable && thread.type !== discord_js_1.EnumResolvers.resolveChannelType('GUILD_PRIVATE_THREAD')) {
        await thread.join();
    }
}
exports.default = run;
