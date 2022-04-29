"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPartials = exports.getAllIntents = void 0;
const discord_js_1 = require("discord.js");
// export function replaceOptions(options: ShewenyClientOptions) {
//   if (!options || (options && !options.intents)) return options;
//   if (options.allIntents) options.intents = getAllIntents();
//   if (options.allPartials) options.partials = getAllPartials();
//   return options;
// }
// Add all discord.js intents to the option
function getAllIntents() {
    const intents = new discord_js_1.Intents();
    for (const intent of Object.keys(discord_js_1.Intents.FLAGS)) {
        intents.add([intent]);
    }
    return intents;
}
exports.getAllIntents = getAllIntents;
// Add all discord.js partials to the option
function getAllPartials() {
    return ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION'];
}
exports.getAllPartials = getAllPartials;
