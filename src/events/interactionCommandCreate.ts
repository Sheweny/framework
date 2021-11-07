import { ShewenyError } from '../errors';
import { Collection } from 'discord.js';
import type { ShewenyClient } from '..';
import type { Inhibitor } from '../structures';
import type { CommandInteraction, ContextMenuInteraction } from 'discord.js';
import { CommandType, InhibitorType, CommandChannel } from '../constants/constants';
export default async function run(client: ShewenyClient, interaction: CommandInteraction | ContextMenuInteraction) {
  try {
    if (!client.managers.commands) return;

    /* -----------------COMMAND----------------- */
    const command = client.collections.commands?.get(interaction.commandName);
    //@ts-ignore
    if (!command || (command && ![CommandType.cmdSlash, CommandType.ctxUser, CommandType.ctxMsg].includes(command.type))) return;
    if (command.before) await command.before(interaction);
    /**
     * Handle inhibitors
     */

    const inhibitors = client.collections.inhibitors?.filter(
      (i: Inhibitor) => i.type.includes(InhibitorType.appCommand) || i.type.includes(InhibitorType.all)
    );

    if (inhibitors && inhibitors.size) {
      const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
      for (const i of sorted) {
        if (!i.execute(client, interaction)) return i.onFailure(client, interaction);
      }
    }

    /* ---------------PERMISSIONS--------------- */
    if (command.adminsOnly && !client.admins?.includes(interaction.user.id))
      return client.managers.commands.emit('userMissingPermissions', interaction, 'BOT_ADMIN');

    /* ---------------IN-GUILD--------------- */
    if (interaction.inGuild()) {
      if (command.channel === CommandChannel.dm) return;

      if (!client.managers.commands.applicationPermissions) {
        let member = interaction.guild!.members.cache.get(interaction.user.id);
        if (!member) member = await interaction.guild!.members.fetch(interaction.user.id);
        if (command.userPermissions.length) {
          for (const permission of command.userPermissions) {
            if (!member.permissions.has(permission)) {
              return client.managers.commands?.emit('userMissingPermissions', interaction, permission);
            }
          }
        }
      }

      if (command.clientPermissions.length) {
        for (const permission of command.clientPermissions) {
          if (!interaction.guild!.me!.permissions.has(permission))
            return client.managers.commands?.emit('clientMissingPermissions', interaction, permission);
        }
      }
    } else {
      /* ---------------IN-DM--------------- */
      if (command.channel === CommandChannel.guild) return;
    }

    /* ---------------COOLDOWNS--------------- */
    if (!client.admins?.includes(interaction.user.id)) {
      if (!command.cooldowns.has(command.name)) {
        command.cooldowns.set(command.name, new Collection());
      }
      const timeNow = Date.now();
      const tStamps = command.cooldowns.get(command.name)!;
      const cdAmount = (command.cooldown || 0) * 1000;
      if (tStamps.has(interaction.user.id)) {
        const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
        if (timeNow < cdExpirationTime) {
          // const timeLeft = (cdExpirationTime - timeNow) / 1000;
          return client.managers.commands?.emit('cooldownLimit', interaction);
        }
      }

      tStamps.set(interaction.user.id, timeNow);
      setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
    }

    /* ---------------COMMAND--------------- */

    await command.execute(interaction);
  } catch (e: any) {
    new ShewenyError(client, e);
  }
}
