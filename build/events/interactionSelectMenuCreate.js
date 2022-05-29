"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants/constants");
const helpers_1 = require("../helpers");
const discord_js_1 = require("discord.js");
async function run(client, interaction) {
    try {
        if (!client.collections.selectMenus)
            return;
        // Exact match
        let selectMenu = client.collections.selectMenus
            .filter(b => b.customId.some(id => !(id instanceof RegExp)))
            .find(value => value.customId.includes(interaction.customId));
        // Regex match
        if (!selectMenu) {
            selectMenu = client.collections.selectMenus
                .filter(b => b.customId.some(id => id instanceof RegExp))
                .find(value => {
                return value.customId.some(element => {
                    if (element.test(interaction.customId)) {
                        element.lastIndex = 0;
                        return true;
                    }
                });
            });
        }
        if (!selectMenu)
            return;
        if (selectMenu.before)
            await selectMenu.before(interaction);
        const inhibitors = client.collections.inhibitors?.filter((i) => i.type.includes(constants_1.INHIBITOR_TYPE.select) || i.type.includes(constants_1.INHIBITOR_TYPE.all));
        if (inhibitors && inhibitors.size) {
            const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
            for (const i of sorted) {
                if (!(await i.execute(client, interaction)))
                    return await i.onFailure(client, interaction);
            }
        }
        /* ---------------COOLDOWNS--------------- */
        if (!client.admins?.includes(interaction.user.id)) {
            if (!client.cooldowns.buttons.has(selectMenu.customId)) {
                client.cooldowns.buttons.set(selectMenu.customId, new discord_js_1.Collection());
            }
            const timeNow = Date.now();
            const tStamps = client.cooldowns.buttons.get(selectMenu.customId);
            const cdAmount = (selectMenu.cooldown || 0) * 1000;
            if (tStamps) {
                if (tStamps.has(interaction.user.id)) {
                    const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
                    if (timeNow < cdExpirationTime) {
                        // const timeLeft = (cdExpirationTime - timeNow) / 1000;
                        return client.managers.buttons?.emit(constants_1.SELECT_EVENTS.cooldownLimit, interaction, cdExpirationTime - timeNow);
                    }
                }
                tStamps.set(interaction.user.id, timeNow);
                setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
            }
        }
        await selectMenu.execute(interaction);
    }
    catch (err) {
        const e = err;
        new helpers_1.ShewenyError(client, e);
    }
}
exports.default = run;
