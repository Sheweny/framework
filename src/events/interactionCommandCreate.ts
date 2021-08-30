import { ShewenyError } from "../errors";
import type { CommandInteraction, ContextMenuInteraction } from "discord.js";
import { Collection } from "collection-data";
import type { ShewenyClient } from "..";
import type { Inhibitor } from "../structures";

export default async function run(
  client: ShewenyClient,
  interaction: CommandInteraction | ContextMenuInteraction
) {
  try {
    if (!client.handlers.commands) return;

    /* -----------------COMMAND----------------- */
    const command = client.collections.commands?.get(interaction.commandName);

    if (!command) return;

    if (command.before) await command.before(interaction);
    /**
     * Handle inhibitors
     */

    const inhibitors = client.collections.inhibitors?.filter(
      (i: Inhibitor) => i.type.includes("APPLICATION_COMMAND") || i.type.includes("ALL")
    );

    if (inhibitors && inhibitors.size) {
      const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
      for (const i of sorted) {
        if (!i.execute(client, interaction)) return i.onFailure(client, interaction);
      }
    }

    /* ---------------PERMISSIONS--------------- */
    if (command.adminsOnly && !client.admins?.includes(interaction.user.id)) return;

    /* ---------------IN-GUILD--------------- */
    if (interaction.inGuild()) {
      if (command.channel === "DM") return;

      if (!client.handlers.commands.applicationPermissions) {
        let member = interaction.guild!.members.cache.get(interaction.user.id);
        if (!member) member = await interaction.guild!.members.fetch(interaction.user.id);
        if (command.userPermissions.length) {
          for (const permission of command.userPermissions) {
            if (!member.permissions.has(permission)) {
              return client.handlers.commands?.emit(
                "userMissingPermissions",
                interaction,
                permission
              );
            }
          }
        }
      }

      if (command.clientPermissions.length) {
        for (const permission of command.clientPermissions) {
          if (!interaction.guild!.me!.permissions.has(permission))
            return client.handlers.commands?.emit(
              "clientMissingPermissions",
              interaction,
              permission
            );
        }
      }
    } else {
      /* ---------------IN-DM--------------- */
      if (command.channel === "GUILD") return;
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
          return client.handlers.commands?.emit("cooldownLimit", interaction);
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
