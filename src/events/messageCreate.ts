import type {
	Message
} from "discord.js";
import { Collection } from "collection-data";
import type { ShewenyClient } from "../index";
import type { IPermissionString } from '../typescript/types/extends';

export default async function run(
	client: ShewenyClient,
	message: Message
) {

	if (!client.commands || client.commandsType !== "MESSAGE_COMMANDS") return;
	if (client.commandsType !== "MESSAGE_COMMANDS") return;
	if (!message.content || message.author.bot) return; // It can be empty with the new message_content intent
	const args = message.content.trim().split(' ');
	if (!args[0]) return;
	/* -----------------COMMAND----------------- */
	const commandName = args.shift()!.toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	/* ---------------PERMISSIONS--------------- */
	if (
		command.userPermissions.includes("BOT_ADMIN") &&
		!client.admins?.includes(message.author.id)
	) return client.emit("userMissingPermissions", message, "BOT_ADMIN");
	/* ---------------IN-GUILD--------------- */
	if (message.guild) {
		if (command.DMOnly) return;
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
	}
	/* ---------------IN-DM--------------- */
	else {
		if (command.guildOnly) return;
	}



	/* ---------------COOLDOWNS--------------- */
	if (!client.admins?.includes(message.author.id)) {
		if (!client.cooldowns.has(command.name)) {
			client.cooldowns.set(command.name, new Collection());
		}
		const timeNow = Date.now();
		const tStamps = client.cooldowns.get(command.name)!;
		const cdAmount = (command.cooldown || 5) * 1000;
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
