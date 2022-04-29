import { AutocompleteInteraction, Collection } from 'discord.js';
import { COMMAND_TYPE, INHIBITOR_TYPE, COMMAND_CHANNEL, COMMAND_PERMISSIONS, COMMAND_EVENTS } from '../constants/constants';
import { ShewenyError } from '../helpers';
import type { ShewenyClient } from '..';
import type { Inhibitor } from '../structures';
import type { CommandInteraction, ContextMenuCommandInteraction } from 'discord.js';
export default async function run(
  client: ShewenyClient,
  interaction: CommandInteraction | ContextMenuCommandInteraction | AutocompleteInteraction,
) {
  try {
    if (!client.managers.commands) return;

    /* -----------------COMMAND----------------- */
    const command = client.collections.commands?.get(interaction.commandName);
    // eslint-disable-next-line
    // @ts-ignore
    if (!command || (command && ![COMMAND_TYPE.cmdSlash, COMMAND_TYPE.ctxUser, COMMAND_TYPE.ctxMsg].includes(command.type))) {
      return;
    }
    if (command.before) await command.before(interaction as CommandInteraction | ContextMenuCommandInteraction);
    /**
     * Handle inhibitors
     */

    const inhibitors = client.collections.inhibitors?.filter(
      (i: Inhibitor) => i.type.includes(INHIBITOR_TYPE.appCommand) || i.type.includes(INHIBITOR_TYPE.all),
    );

    if (inhibitors && inhibitors.size) {
      const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
      for (const i of sorted) {
        if (!(await i.execute(client, interaction))) return await i.onFailure(client, interaction);
      }
    }

    /* ---------------PERMISSIONS--------------- */
    if (command.adminsOnly && !client.admins?.includes(interaction.user.id)) {
      return client.managers.commands.emit(COMMAND_EVENTS.userMissingPerm, interaction, COMMAND_PERMISSIONS.admin);
    }

    /* ---------------IN-GUILD--------------- */
    if (interaction.inGuild() && interaction.guild) {
      if (command.channel === COMMAND_CHANNEL.dm) return;

      if (!client.managers.commands.applicationPermissions) {
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
          if (!interaction.guild.me?.permissions.has(permission)) {
            return client.managers.commands?.emit(COMMAND_EVENTS.clientMissingPerm, interaction, permission);
          }
        }
      }
    } else if (command.channel === COMMAND_CHANNEL.guild) {
      return;
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
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
