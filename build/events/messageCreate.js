"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const discord_js_1 = require("discord.js");
const constants_1 = require("../constants/constants");
async function run(client, message) {
    try {
        if (!client.managers.commands)
            return;
        // message.content can be empty with the new message_content intent
        if (!message.content || message.author.bot)
            return;
        const prefix = client.managers.commands.prefix || '';
        const args = message.content.trim().slice(prefix.length).split(/ +/);
        if (!args[0])
            return;
        if (!message.content?.startsWith(prefix))
            return;
        /* -----------------COMMAND----------------- */
        const commandName = args.shift()?.toLowerCase();
        if (!commandName)
            return;
        const command = client.collections.commands?.get(commandName) ||
            client.collections.commands?.find(cmd => {
                if (cmd.aliases && cmd.aliases.length && cmd.aliases.includes(commandName))
                    return true;
                else
                    return false;
            });
        if (!command || (command && command.type !== constants_1.COMMAND_TYPE.cmdMsg))
            return;
        if (command.before)
            await command.before(message);
        /**
         * Handle inhibitors
         */
        const inhibitors = client.collections.inhibitors?.filter((i) => i.type.includes(constants_1.INHIBITOR_TYPE.message) || i.type.includes(constants_1.INHIBITOR_TYPE.all));
        if (inhibitors && inhibitors.size) {
            const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
            for (const i of sorted) {
                if (!(await i.execute(client, message)))
                    return await i.onFailure(client, message);
            }
        }
        /* ---------------PERMISSIONS--------------- */
        if (command.adminsOnly && !client.admins?.includes(message.author.id)) {
            return client.managers.commands.emit(constants_1.COMMAND_EVENTS.userMissingPerm, message, constants_1.COMMAND_PERMISSIONS.admin);
        }
        /* ---------------IN-GUILD--------------- */
        if (message.guild) {
            if (command.channel === constants_1.COMMAND_CHANNEL.dm)
                return;
            let member = message.guild.members.cache.get(message.author.id);
            if (!member)
                member = await message.guild.members.fetch(message.author.id);
            if (command.userPermissions.length > 0) {
                for (const permission of command.userPermissions) {
                    if (!member.permissions.has(permission)) {
                        return client.managers.commands.emit(constants_1.COMMAND_EVENTS.userMissingPerm, message, permission);
                    }
                }
            }
            if (command.clientPermissions.length > 0) {
                for (const permission of command.clientPermissions) {
                    if (!message.guild.me?.permissions.has(permission)) {
                        return client.managers.commands.emit(constants_1.COMMAND_EVENTS.clientMissingPerm, message, permission);
                    }
                }
            }
        }
        else if (command.channel === constants_1.COMMAND_CHANNEL.guild) {
            return;
        }
        /* ---------------COOLDOWNS--------------- */
        if (!client.disableCooldownsForAdmins || (client.disableCooldownsForAdmins && !client.admins?.includes(message.author.id))) {
            if (!client.cooldowns.commands.has(command.name)) {
                client.cooldowns.commands.set(command.name, new discord_js_1.Collection());
            }
            const timeNow = Date.now();
            const tStamps = client.cooldowns.commands.get(command.name);
            if (tStamps) {
                const cdAmount = (command.cooldown || 0) * 1000;
                if (tStamps.has(message.author.id)) {
                    const cdExpirationTime = (tStamps.get(message.author.id) || 0) + cdAmount;
                    if (timeNow < cdExpirationTime) {
                        // const timeLeft = (cdExpirationTime - timeNow) / 1000;
                        return client.managers.commands.emit(constants_1.COMMAND_EVENTS.cooldownLimit, message, cdExpirationTime - timeNow);
                    }
                }
                tStamps.set(message.author.id, timeNow);
                setTimeout(() => tStamps.delete(message.author.id), cdAmount);
            }
        }
        // eslint-disable-next-line
        const messageArgs = {};
        /* ---------------ARGUMENTS--------------- */
        const types = [
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.string,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.number,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.boolean,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.rest,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.guild,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.channel,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.member,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.guild_emoji,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.role,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.user,
            constants_1.COMMAND_MESSAGE_ARGS_TYPE.command,
        ];
        if (command.args && command.args.length > 0) {
            for (let i = 0; i < command.args.length; i++) {
                const argCommand = command.args[i];
                if (!types.includes(argCommand?.type))
                    continue;
                if (!args[i]) {
                    // No argument provided
                    messageArgs[argCommand?.name] = argCommand?.default || null;
                    continue;
                }
                switch (argCommand.type) {
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.string:
                        messageArgs[argCommand?.name] = String(args[i]);
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.number:
                        messageArgs[argCommand?.name] = Number(args[i]);
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.boolean:
                        messageArgs[argCommand?.name] = Boolean(args[i]);
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.rest:
                        messageArgs[argCommand?.name] = String(args.slice(i).join(' '));
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.guild:
                        messageArgs[argCommand?.name] = client.util.resolveGuild(args[i]);
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.channel:
                        if (!message.guild) {
                            messageArgs[argCommand?.name] = null;
                            break;
                        }
                        messageArgs[argCommand?.name] = client.util.resolveChannel(message.guild, args[i]);
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.member:
                        if (!message.guild) {
                            messageArgs[argCommand?.name] = null;
                            break;
                        }
                        messageArgs[argCommand?.name] = await client.util.resolveMember(message.guild, args[i]);
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.guild_emoji:
                        if (!message.guild) {
                            messageArgs[argCommand?.name] = null;
                            break;
                        }
                        messageArgs[argCommand?.name] = client.util.resolveGuildEmoji(message.guild, args[i]);
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.role:
                        if (!message.guild) {
                            messageArgs[argCommand?.name] = null;
                            break;
                        }
                        messageArgs[argCommand?.name] = client.util.resolveRole(message.guild, args[i]);
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.user:
                        messageArgs[argCommand?.name] = await client.util.resolveUser(args[i]);
                        break;
                    case constants_1.COMMAND_MESSAGE_ARGS_TYPE.command:
                        messageArgs[argCommand?.name] = await client.util.resolveCommand(args[i]);
                        break;
                }
            }
        }
        /* ---------------COMMAND--------------- */
        await command.execute(message, messageArgs);
    }
    catch (err) {
        const e = err;
        new helpers_1.ShewenyError(client, e);
    }
}
exports.default = run;
