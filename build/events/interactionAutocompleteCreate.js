"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants/constants");
const helpers_1 = require("../helpers");
async function run(client, interaction) {
    try {
        if (!client.managers.commands)
            return;
        /* -----------------COMMAND----------------- */
        const command = client.collections.commands?.get(interaction.commandName);
        // eslint-disable-next-line
        // @ts-ignore
        if (!command || (command && ![constants_1.COMMAND_TYPE.cmdSlash, constants_1.COMMAND_TYPE.ctxUser, constants_1.COMMAND_TYPE.ctxMsg].includes(command.type))) {
            return;
        }
        if (interaction.isAutocomplete() && command.onAutocomplete)
            return await command.onAutocomplete(interaction);
    }
    catch (err) {
        const e = err;
        new helpers_1.ShewenyError(client, e);
    }
}
exports.default = run;
