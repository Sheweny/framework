import type {
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { Collection } from "collection-data";
import type { ShewenyClient } from "../index";
import type { IPermissionString } from '../typescript/types/extends';

interface CommandInteractionExtend extends CommandInteraction {
  subCommand: string | null;
}

export default async function run(
  client: ShewenyClient,
  interaction: CommandInteractionExtend
) {
  if (!client.commands) return;
  if (client.commandsType !== "SLASH_COMMANDS") return;
  let member = interaction.guild!.members.cache.get(interaction.user.id);
  if (!member) member = await interaction.guild!.members.fetch(interaction.user.id);
  /* -----------------COMMAND----------------- */
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  /* ---------------PERMISSIONS--------------- */
  if (
    command.userPermissions.includes("BOT_ADMIN") &&
    !client.admins?.includes(interaction.user.id)
  ) {
    return client.emit("userMissingPermissions", interaction, "BOT_ADMIN");
  }
  if (command.userPermissions.length) {
    for (const permission of command.userPermissions) {
      if (
        !interaction.guild?.members.cache
          .get(interaction.user.id)!
          .permissions.has(permission as IPermissionString)
      )
        return client.emit("userMissingPermissions", interaction, permission);
    }
  }
  if (command.botPermissions.length) {
    for (const permission of command.botPermissions) {
      if (!interaction.guild!.me!.permissions.has(permission as IPermissionString))
        return client.emit("botMissingPermissions", interaction, permission);
    }
  }

  /* ---------------COOLDOWNS--------------- */
  if (!client.admins?.includes(interaction.user.id)) {
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Collection());
    }
    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.name)!;
    const cdAmount = (command.cooldown || 5) * 1000;
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
  interaction.subCommand = interaction.options.getSubcommand(false);

  //interaction.subcommand = interaction.options
  /* ---------------OPTIONS--------------- */

  let args: CommandInteractionOptionResolver = interaction.options;
  // if (interaction.subcommand) args = interaction.options.get(interaction.subcommand)?.options;

  /* ---------------COMMAND--------------- */
  try {
    await command.execute!(interaction, args);
  } catch (e) {
    console.error(e);
  }
}
