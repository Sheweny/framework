import type { CommandInteraction, ContextMenuInteraction } from "discord.js";
import { Collection } from "collection-data";
import { ShewenyClient } from "..";
import { IPermissionString } from "../typescript/types/extends";
import { Inhibitor } from "../structures";

export default async function run(
  client: ShewenyClient,
  interaction: CommandInteraction | ContextMenuInteraction
) {
  if (!client.commands.interaction) return;

  /* -----------------COMMAND----------------- */
  const command = client.commands.interaction.get(interaction.commandName);

  if (!command) return;

  /**
   * Handle inhibitors
   */
  const inhibitors = client.inhibitors?.filter(
    (i: Inhibitor) => i.type === "APPLICATION_COMMAND" || i.type === "ALL"
  );
  if (inhibitors && !inhibitors.size) {
    const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
    for (const i of sorted) {
      if (!i.execute(client, interaction)) return i.onFailure(client, interaction);
    }
  }

  /* ---------------PERMISSIONS--------------- */
  if (
    command.userPermissions.includes("BOT_ADMIN") &&
    !client.admins?.includes(interaction.user.id)
  ) {
    return client.emit("userMissingPermissions", interaction, "BOT_ADMIN");
  }
  /* ---------------IN-GUILD--------------- */
  if (interaction.inGuild()) {
    if (command.only === "DM") return;
    let member = interaction.guild!.members.cache.get(interaction.user.id);
    if (!member) member = await interaction.guild!.members.fetch(interaction.user.id);
    if (command.userPermissions.length) {
      for (const permission of command.userPermissions) {
        if (member.permissions.has(permission as IPermissionString))
          return client.emit("userMissingPermissions", interaction, permission);
      }
    }
    if (command.botPermissions.length) {
      for (const permission of command.botPermissions) {
        if (!interaction.guild!.me!.permissions.has(permission as IPermissionString))
          return client.emit("botMissingPermissions", interaction, permission);
      }
    }
  } else {
    /* ---------------IN-DM--------------- */
    if (command.only === "GUILD") return;
  }

  /* ---------------COOLDOWNS--------------- */
  if (!client.admins?.includes(interaction.user.id)) {
    if (!client.cooldowns.has(command.data.name)) {
      client.cooldowns.set(command.data.name, new Collection());
    }
    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.data.name)!;
    const cdAmount = (command.cooldown || 0) * 1000;
    if (tStamps.has(interaction.user.id)) {
      const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
      if (timeNow < cdExpirationTime) {
        // const timeLeft = (cdExpirationTime - timeNow) / 1000;
        return client.emit("cooldownLimite", interaction);
      }
    }

    tStamps.set(interaction.user.id, timeNow);
    setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
  }

  /* ---------------SUB-COMMAND--------------- */
  // interaction.subCommand = interaction.options.getSubcommand(false);

  // interaction.subCommand = interaction.options
  /* ---------------OPTIONS--------------- */

  // let args: CommandInteractionOptionResolver = interaction.options;
  // if (interaction.subCommand) args = interaction.options.get(interaction.subCommand)?.options;

  /* ---------------COMMAND--------------- */
  try {
    await command.execute!(interaction);
  } catch (e) {
    console.error(e);
  }
}
