"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const constants_1 = require("../constants/constants");
async function run(client, interaction) {
    try {
        if (!client.collections.modals)
            return;
        // Exact match
        let modal = client.collections.modals
            .filter(m => m.customId.some(id => !(id instanceof RegExp)))
            .find(value => value.customId.includes(interaction.customId));
        // Regex match
        if (!modal) {
            modal = client.collections.modals
                .filter(m => m.customId.some(id => id instanceof RegExp))
                .find(value => {
                return value.customId.some(element => {
                    if (element.test(interaction.customId)) {
                        element.lastIndex = 0;
                        return true;
                    }
                });
            });
        }
        if (!modal)
            return;
        if (modal.before)
            await modal.before(interaction);
        const inhibitors = client.collections.inhibitors?.filter((i) => i.type.includes(constants_1.INHIBITOR_TYPE.modal) || i.type.includes(constants_1.INHIBITOR_TYPE.all));
        if (inhibitors && inhibitors.size) {
            const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
            for (const i of sorted) {
                if (!(await i.execute(client, interaction)))
                    return await i.onFailure(client, interaction);
            }
        }
        await modal.execute(interaction);
    }
    catch (err) {
        const e = err;
        new helpers_1.ShewenyError(client, e);
    }
}
exports.default = run;
