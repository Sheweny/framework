import { ShewenyError } from '../helpers/index.js';
import { Collection } from 'discord.js';
import {
  COMMAND_TYPE,
  INHIBITOR_TYPE,
  COMMAND_CHANNEL,
  COMMAND_MESSAGE_ARGS_TYPE,
  COMMAND_PERMISSIONS,
  COMMAND_EVENTS,
} from '../constants/constants.js';
import type { ShewenyClient } from '../client/Client.js';
import type { Inhibitor } from '../structures/index.js';
import type { Message } from 'discord.js';

export default async function run(client: ShewenyClient, message: Message) {
  try {
    if (!client.managers.commands) return;

    // message.content can be empty with the new message_content intent
    if (!message.content || message.author.bot) return;
    const prefix = client.managers.commands.prefix || '';
    const args = message.content.trim().slice(prefix.length).split(/ +/);
    if (!args[0]) return;
    if (!message.content?.startsWith(prefix)) return;
    /* -----------------COMMAND----------------- */
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;
    const commands =
      client.collections.commands?.get(commandName) ||
      client.collections.commands?.find(cmds => {
        for (const cmd of cmds) {
          if (cmd.aliases && cmd.aliases.length && cmd.aliases.includes(commandName)) return true;
          else return false;
        }
        return false;
      });
    if (!commands || (commands && !commands.length)) return;
    for (const command of commands) {
      if (!command || (command && command.type !== COMMAND_TYPE.cmdMsg)) return;
      if(!command.enabled) return;
      if (command.before) await command.before(message);
      /**
       * Handle inhibitors
       */
      const inhibitorsCollection = client.collections.inhibitors?.filter((is: Inhibitor[]) => {
        for (const i of is) {
          return i.type.includes(INHIBITOR_TYPE.message) || i.type.includes(INHIBITOR_TYPE.all);
        }
        return false;
      });
      const inhibitorsArray: Inhibitor[] = [];
      for (const [, inhibitors] of inhibitorsCollection) {
        if (inhibitors && inhibitors.length) {
          for (const inhibitor of inhibitors) {
            inhibitorsArray.push(inhibitor);
          }
        }
      }
      if (inhibitorsArray && inhibitorsArray.length) {
        const sorted = inhibitorsArray.sort((a, b) => b.priority - a.priority);
        for (const i of sorted) {
          if (!(await i.execute(client, message))) return await i.onFailure(client, message);
        }
      }

      /* ---------------PERMISSIONS--------------- */
      if (command.adminsOnly && !client.admins?.includes(message.author.id)) {
        return client.managers.commands.emit(COMMAND_EVENTS.userMissingPerm, message, COMMAND_PERMISSIONS.admin);
      }

      /* ---------------IN-GUILD--------------- */
      if (message.guild) {
        if (command.channel === COMMAND_CHANNEL.dm) {
          return client.managers.commands.emit(COMMAND_EVENTS.invalidChannel, command, message);
        }

        let member = message.guild.members.cache.get(message.author.id);
        if (!member) member = await message.guild.members.fetch(message.author.id);
        if (command.userPermissions.length > 0) {
          for (const permission of command.userPermissions) {
            if (!member.permissions.has(permission)) {
              return client.managers.commands.emit(COMMAND_EVENTS.userMissingPerm, message, permission);
            }
          }
        }

        if (command.clientPermissions.length > 0) {
          for (const permission of command.clientPermissions) {
            if (!message.guild.members.me?.permissions.has(permission)) {
              return client.managers.commands.emit(COMMAND_EVENTS.clientMissingPerm, message, permission);
            }
          }
        }
      } else if (command.channel === COMMAND_CHANNEL.guild) {
        return client.managers.commands.emit(COMMAND_EVENTS.invalidChannel, command, message);
      }

      /* ---------------COOLDOWNS--------------- */
      if (
        !client.disableCooldownsForAdmins ||
        (client.disableCooldownsForAdmins && !client.admins?.includes(message.author.id))
      ) {
        if (!client.cooldowns.commands.has(command.name)) {
          client.cooldowns.commands.set(command.name, new Collection());
        }
        const timeNow = Date.now();
        const tStamps = client.cooldowns.commands.get(command.name);
        if (tStamps) {
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
      }
      // eslint-disable-next-line
      const messageArgs: any = {};
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
        COMMAND_MESSAGE_ARGS_TYPE.command,
      ];

      if (command.args && command.args.length > 0) {
        for (let i = 0; i < command.args.length; i++) {
          const argCommand = command.args[i];
          if (!argCommand) continue;
          if (!types.includes(argCommand.type)) continue;
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
              messageArgs[argCommand?.name] = client.util.resolveGuild(args[i] || '');
              break;
            case COMMAND_MESSAGE_ARGS_TYPE.channel:
              if (!message.guild) {
                messageArgs[argCommand?.name] = null;
                break;
              }
              messageArgs[argCommand?.name] = client.util.resolveChannel(message.guild, args[i] || '');
              break;
            case COMMAND_MESSAGE_ARGS_TYPE.member:
              if (!message.guild) {
                messageArgs[argCommand?.name] = null;
                break;
              }
              messageArgs[argCommand?.name] = await client.util.resolveMember(message.guild, args[i] || '');
              break;
            case COMMAND_MESSAGE_ARGS_TYPE.guild_emoji:
              if (!message.guild) {
                messageArgs[argCommand?.name] = null;
                break;
              }
              messageArgs[argCommand?.name] = client.util.resolveGuildEmoji(message.guild, args[i] || '');
              break;
            case COMMAND_MESSAGE_ARGS_TYPE.role:
              if (!message.guild) {
                messageArgs[argCommand?.name] = null;
                break;
              }
              messageArgs[argCommand?.name] = client.util.resolveRole(message.guild, args[i] || '');
              break;
            case COMMAND_MESSAGE_ARGS_TYPE.user:
              messageArgs[argCommand?.name] = await client.util.resolveUser(args[i] || '');
              break;
            case COMMAND_MESSAGE_ARGS_TYPE.command:
              messageArgs[argCommand?.name] = await client.util.resolveCommand(args[i] || '');
              break;
          }
        }

        /* ---------------COMMAND--------------- */

        await command.execute(message, messageArgs);
      }
    }
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
