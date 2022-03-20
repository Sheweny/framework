"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
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
        if (command.before)
            await command.before(interaction);
        /**
         * Handle inhibitors
         */
        const inhibitors = client.collections.inhibitors?.filter((i) => i.type.includes(constants_1.INHIBITOR_TYPE.appCommand) || i.type.includes(constants_1.INHIBITOR_TYPE.all));
        if (inhibitors && inhibitors.size) {
            const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
            for (const i of sorted) {
                if (!(await i.execute(client, interaction)))
                    return await i.onFailure(client, interaction);
            }
        }
        /* ---------------PERMISSIONS--------------- */
        if (command.adminsOnly && !client.admins?.includes(interaction.user.id)) {
            return client.managers.commands.emit(constants_1.COMMAND_EVENTS.userMissingPerm, interaction, constants_1.COMMAND_PERMISSIONS.admin);
        }
        /* ---------------IN-GUILD--------------- */
        if (interaction.inGuild() && interaction.guild) {
            if (command.channel === constants_1.COMMAND_CHANNEL.dm)
                return;
            if (!client.managers.commands.applicationPermissions) {
                let member = interaction.guild.members.cache.get(interaction.user.id);
                if (!member)
                    member = await interaction.guild.members.fetch(interaction.user.id);
                if (command.userPermissions.length) {
                    for (const permission of command.userPermissions) {
                        if (!member.permissions.has(permission)) {
                            return client.managers.commands?.emit(constants_1.COMMAND_EVENTS.userMissingPerm, interaction, permission);
                        }
                    }
                }
            }
            if (command.clientPermissions.length) {
                for (const permission of command.clientPermissions) {
                    if (!interaction.guild.me?.permissions.has(permission)) {
                        return client.managers.commands?.emit(constants_1.COMMAND_EVENTS.clientMissingPerm, interaction, permission);
                    }
                }
            }
        }
        else if (command.channel === constants_1.COMMAND_CHANNEL.guild) {
            return;
        }
        /* ---------------COOLDOWNS--------------- */
        if (!client.disableCooldownsForAdmins ||
            (client.disableCooldownsForAdmins && !client.admins?.includes(interaction.user.id))) {
            if (!command.cooldowns.has(command.name)) {
                command.cooldowns.set(command.name, new discord_js_1.Collection());
            }
            const timeNow = Date.now();
            const tStamps = command.cooldowns.get(command.name);
            if (tStamps) {
                const cdAmount = (command.cooldown || 0) * 1000;
                if (tStamps.has(interaction.user.id)) {
                    const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
                    if (timeNow < cdExpirationTime) {
                        // const timeLeft = (cdExpirationTime - timeNow) / 1000;
                        return client.managers.commands?.emit(constants_1.COMMAND_EVENTS.cooldownLimit, interaction, cdExpirationTime - timeNow);
                    }
                }
                tStamps.set(interaction.user.id, timeNow);
                setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
            }
        }
        /* ---------------COMMAND--------------- */
        await command.execute(interaction);
    }
    catch (err) {
        const e = err;
        new helpers_1.ShewenyError(client, e);
    }
}
exports.default = run;
