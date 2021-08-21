import { Message } from "discord.js";
import { Collection } from "collection-data";
import { ShewenyClient } from "..";
import { IPermissionString } from "../typescript/types/extends";
import { Inhibitor } from "../structures";

export default async function run(client: ShewenyClient, message: Message) {
  if (!client.commands.message || client.commandsType !== "MESSAGE_COMMANDS") return;

  if (!message.content || message.author.bot) return; // It can be empty with the new message_content intent
  const prefix = client.handlers.messageCommands!.options.prefix || "";
  const args = message.content.trim().slice(prefix.length).split(/ +/);
  if (!args[0]) return;
  /* -----------------COMMAND----------------- */
  const commandName = args.shift()!.toLowerCase();
  const command =
    client.commands.message.get(commandName) ||
    client.commands.message.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;

  /**
   * Handle inhibitors
   */
  const inhibitors = client.inhibitors?.filter(
    (i: Inhibitor) => i.type === "MESSAGE_COMMAND" || i.type === "ALL"
  );
  if (inhibitors && inhibitors.size) {
    const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
    for (const i of sorted) {
      if (!i.execute(client, message)) return i.onFailure(client, message);
    }
  }

  /* ---------------PERMISSIONS--------------- */
  if (
    command.userPermissions.includes("BOT_ADMIN") &&
    !client.admins?.includes(message.author.id)
  )
    return client.emit("userMissingPermissions", message, "BOT_ADMIN");
  /* ---------------IN-GUILD--------------- */
  if (message.guild) {
    if (command.only === "DM") return;
    let member = message.guild!.members.cache.get(message.author.id);
    if (!member) member = await message.guild!.members.fetch(message.author.id);
    if (command.userPermissions.length) {
      for (const permission of command.userPermissions) {
        if (!member.permissions.has(permission as IPermissionString))
          return client.emit("userMissingPermissions", message, permission);
      }
    }
    if (command.botPermissions.length) {
      for (const permission of command.botPermissions) {
        if (!message.guild!.me!.permissions.has(permission as IPermissionString))
          return client.emit("botMissingPermissions", message, permission);
      }
    }
  } else {
    /* ---------------IN-DM--------------- */
    if (command.only === "GUILD") return;
  }

  /* ---------------COOLDOWNS--------------- */
  if (!client.admins?.includes(message.author.id)) {
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Collection());
    }
    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.name)!;
    const cdAmount = (command.cooldown || 0) * 1000;
    if (tStamps.has(message.author.id)) {
      const cdExpirationTime = (tStamps.get(message.author.id) || 0) + cdAmount;
      if (timeNow < cdExpirationTime) {
        // const timeLeft = (cdExpirationTime - timeNow) / 1000;
        return client.emit("cooldownLimite", message);
      }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);
  }
  /* ---------------COMMAND--------------- */
  try {
    await command.execute!(message, args);
  } catch (e) {
    console.error(e);
  }
}
