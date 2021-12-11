import { ShewenyError } from '../helpers';
import { Collection } from 'discord.js';
import {
  COMMAND_TYPE,
  INHIBITOR_TYPE,
  COMMAND_CHANNEL,
  COMMAND_MESSAGE_ARGS_TYPE,
  COMMAND_PERMISSIONS,
  COMMAND_EVENTS,
} from '../constants/constants';
import type { ShewenyClient } from '../client/Client';
import type { Inhibitor } from '../structures';
import type { Message } from 'discord.js';

export default async function run(client: ShewenyClient, message: Message) {
  try {
    if (!client.managers.commands) return;

    if (!message.content || message.author.bot) return; // It can be empty with the new message_content intent
    const prefix = client.managers.commands.prefix || '';
    const args = message.content.trim().slice(prefix.length).split(/ +/);
    if (!args[0]) return;
    if (!message.content?.startsWith(prefix)) return;
    /* -----------------COMMAND----------------- */
    const commandName = args.shift()!.toLowerCase();
    const command =
      client.collections.commands?.get(commandName) ||
      client.collections.commands?.find((cmd) => cmd.aliases! && cmd.aliases.includes(commandName));
    if (!command || (command && command.type !== COMMAND_TYPE.cmdMsg)) return;
    if (command.before) await command.before(message /*, args*/);
    /**
     * Handle inhibitors
     */
    const inhibitors = client.collections.inhibitors?.filter(
      (i: Inhibitor) => i.type.includes(INHIBITOR_TYPE.message) || i.type.includes(INHIBITOR_TYPE.all)
    );
    if (inhibitors && inhibitors.size) {
      const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
      for (const i of sorted) {
        if (!i.execute(client, message)) return i.onFailure(client, message);
      }
    }

    /* ---------------PERMISSIONS--------------- */
    if (command.adminsOnly && !client.admins?.includes(message.author.id))
      return client.managers.commands.emit(COMMAND_EVENTS.userMissingPerm, message, COMMAND_PERMISSIONS.admin);

    /* ---------------IN-GUILD--------------- */
    if (message.guild) {
      if (command.channel === COMMAND_CHANNEL.dm) return;

      let member = message.guild!.members.cache.get(message.author.id);
      if (!member) member = await message.guild!.members.fetch(message.author.id);
      if (command.userPermissions.length > 0) {
        for (const permission of command.userPermissions) {
          if (!member.permissions.has(permission))
            return client.managers.commands.emit(COMMAND_EVENTS.userMissingPerm, message, permission);
        }
      }

      if (command.clientPermissions.length > 0) {
        for (const permission of command.clientPermissions) {
          if (!message.guild!.me!.permissions.has(permission))
            return client.managers.commands.emit(COMMAND_EVENTS.clientMissingPerm, message, permission);
        }
      }
    } else {
      /* ---------------IN-DM--------------- */
      if (command.channel === 'GUILD') return;
    }
    /* ---------------COOLDOWNS--------------- */
    if (!client.admins?.includes(message.author.id)) {
      if (!command.cooldowns.has(command.name)) {
        command.cooldowns.set(command.name, new Collection());
      }
      const timeNow = Date.now();
      const tStamps = command.cooldowns.get(command.name)!;
      const cdAmount = (command.cooldown || 0) * 1000;
      if (tStamps.has(message.author.id)) {
        const cdExpirationTime = (tStamps.get(message.author.id) || 0) + cdAmount;
        if (timeNow < cdExpirationTime) {
          // const timeLeft = (cdExpirationTime - timeNow) / 1000;
          return client.managers.commands.emit(COMMAND_EVENTS.cooldownLimit, message, cdExpirationTime - timeNow);
        }
      }

      tStamps.set(message.author.id, timeNow);
      setTimeout(() => tStamps.delete(message.author.id), cdAmount);
    }

    let messageArgs: any = {};
    /* ---------------ARGUMENTS--------------- */
    const types = [
      COMMAND_MESSAGE_ARGS_TYPE.string,
      COMMAND_MESSAGE_ARGS_TYPE.number,
      COMMAND_MESSAGE_ARGS_TYPE.boolean,
      COMMAND_MESSAGE_ARGS_TYPE.rest,
      COMMAND_MESSAGE_ARGS_TYPE.guild,
      COMMAND_MESSAGE_ARGS_TYPE.channel,
      COMMAND_MESSAGE_ARGS_TYPE.member,
      COMMAND_MESSAGE_ARGS_TYPE.guild_emoji,
      COMMAND_MESSAGE_ARGS_TYPE.role,
      COMMAND_MESSAGE_ARGS_TYPE.user,
    ];

    if (command.args && command.args.length > 0) {
      for (let i = 0; i < command.args.length; i++) {
        const argCommand = command.args[i];
        if (!types.includes(argCommand?.type)) continue; // Bad type
        if (!args[i]) {
          // No argument provided
          messageArgs[argCommand?.name] = argCommand?.default || null;
          continue;
        }
        switch (argCommand.type) {
          case COMMAND_MESSAGE_ARGS_TYPE.string:
            messageArgs[argCommand?.name] = String(args[i]);
            break;
          case COMMAND_MESSAGE_ARGS_TYPE.number:
            messageArgs[argCommand?.name] = Number(args[i]);
            break;
          case COMMAND_MESSAGE_ARGS_TYPE.boolean:
            messageArgs[argCommand?.name] = Boolean(args[i]);
            break;
          case COMMAND_MESSAGE_ARGS_TYPE.rest:
            messageArgs[argCommand?.name] = String(args.slice(i).join(' '));
            break;

          case COMMAND_MESSAGE_ARGS_TYPE.guild:
            messageArgs[argCommand?.name] = client.util.resolveGuild(args[i]);
            break;
          case COMMAND_MESSAGE_ARGS_TYPE.channel:
            if (!message.guild) {
              messageArgs[argCommand?.name] = null;
              break;
            }
            messageArgs[argCommand?.name] = client.util.resolveChannel(message.guild, args[i]);
            break;
          case COMMAND_MESSAGE_ARGS_TYPE.member:
            if (!message.guild) {
              messageArgs[argCommand?.name] = null;
              break;
            }
            messageArgs[argCommand?.name] = await client.util.resolveMember(message.guild, args[i]);
            break;
          case COMMAND_MESSAGE_ARGS_TYPE.guild_emoji:
            if (!message.guild) {
              messageArgs[argCommand?.name] = null;
              break;
            }
            messageArgs[argCommand?.name] = client.util.resolveGuildEmoji(message.guild, args[i]);
            break;
          case COMMAND_MESSAGE_ARGS_TYPE.role:
            if (!message.guild) {
              messageArgs[argCommand?.name] = null;
              break;
            }
            messageArgs[argCommand?.name] = client.util.resolveRole(message.guild, args[i]);
            break;
          case COMMAND_MESSAGE_ARGS_TYPE.user:
            messageArgs[argCommand?.name] = await client.util.resolveUser(args[i]);
            break;
        }
      }
    }

    /* ---------------COMMAND--------------- */

    await command.execute(message, messageArgs);
  } catch (e: any) {
    new ShewenyError(client, e);
  }
}
