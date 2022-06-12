import { AutocompleteInteraction, Collection } from 'discord.js';
import { COMMAND_TYPE, INHIBITOR_TYPE, COMMAND_CHANNEL, COMMAND_PERMISSIONS, COMMAND_EVENTS } from '../constants/constants.js';
import { ShewenyError } from '../helpers/index.js';
import type { ShewenyClient } from '../client/Client.js';
import type { Inhibitor } from '../structures/index.js';
import type { CommandInteraction, ContextMenuCommandInteraction } from 'discord.js';
export default async function run(
  client: ShewenyClient,
  interaction: CommandInteraction | ContextMenuCommandInteraction | AutocompleteInteraction,
) {
  try {
    if (!client.managers.commands) return;

    /* -----------------COMMAND----------------- */
    const commands = client.collections.commands?.get(interaction.commandName);
    if (!commands || (commands && !commands.length)) return;
    for (const command of commands) {
      await (async () => {
        // eslint-disable-next-line
        // @ts-ignore
        if (!command || (command && ![COMMAND_TYPE.cmdSlash, COMMAND_TYPE.ctxUser, COMMAND_TYPE.ctxMsg].includes(command.type))) {
          return;
        }
        if (!command.enabled) return;
        if (command.before) await command.before(interaction as CommandInteraction | ContextMenuCommandInteraction);
        /**
         * Handle inhibitors
         */
        const inhibitorsCollection = client.collections.inhibitors?.filter((is: Inhibitor[]) => {
          for (const i of is) {
            return i.type.includes(INHIBITOR_TYPE.appCommand) || i.type.includes(INHIBITOR_TYPE.all);
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
            if (!(await i.execute(command, interaction))) return await i.onFailure(command, interaction);
          }
        }

        /* ---------------PERMISSIONS--------------- */
        if (command.adminsOnly && !client.admins?.includes(interaction.user.id)) {
          return client.managers.commands?.emit(COMMAND_EVENTS.userMissingPerm, interaction, COMMAND_PERMISSIONS.admin);
        }

        /* ---------------IN-GUILD--------------- */
        if (interaction.inGuild() && interaction.guild) {
          if (command.channel === COMMAND_CHANNEL.dm) {
            return client.managers.commands?.emit(COMMAND_EVENTS.invalidChannel, command, interaction);
          }
          if (!client.managers.commands?.applicationPermissions) {
            let member = interaction.guild.members.cache.get(interaction.user.id);
            if (!member) member = await interaction.guild.members.fetch(interaction.user.id);
            if (command.userPermissions.length) {
              for (const permission of command.userPermissions) {
                if (!member.permissions.has(permission)) {
                  return client.managers.commands?.emit(COMMAND_EVENTS.userMissingPerm, interaction, permission);
                }
              }
            }
          }

          if (command.clientPermissions.length) {
            for (const permission of command.clientPermissions) {
              if (!interaction.guild.members.me?.permissions.has(permission)) {
                return client.managers.commands?.emit(COMMAND_EVENTS.clientMissingPerm, interaction, permission);
              }
            }
          }
        } else if (command.channel === COMMAND_CHANNEL.guild) {
          return client.managers.commands?.emit(COMMAND_EVENTS.invalidChannel, command, interaction);
        }

        /* ---------------COOLDOWNS--------------- */
        if (
          !client.disableCooldownsForAdmins ||
          (client.disableCooldownsForAdmins && !client.admins?.includes(interaction.user.id))
        ) {
          if (!client.cooldowns.commands.has(command.name)) {
            client.cooldowns.commands.set(command.name, new Collection());
          }
          const timeNow = Date.now();
          const tStamps = client.cooldowns.commands.get(command.name);
          if (tStamps) {
            const cdAmount = (command.cooldown || 0) * 1000;
            if (tStamps.has(interaction.user.id)) {
              const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
              if (timeNow < cdExpirationTime) {
                // const timeLeft = (cdExpirationTime - timeNow) / 1000;
                return client.managers.commands?.emit(COMMAND_EVENTS.cooldownLimit, interaction, cdExpirationTime - timeNow);
              }
            }
            tStamps.set(interaction.user.id, timeNow);
            setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
          }
        }

        /* ---------------COMMAND--------------- */

        await command.execute(interaction as CommandInteraction | ContextMenuCommandInteraction);
      })();
    }
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, 'EVAL_ERROR', `command with name ${interaction.commandName}`, e.message);
  }
}
