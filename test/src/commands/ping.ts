import { Command, ShewenyClient } from '../../../';
import type { Message } from 'discord.js'

export class PingCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, 'ping', {
			description: 'Ping the bot',
			category: 'Misc',
			DMOnly: true,
		})
	}
	execute(message: Message) {
		message.reply('Pong !')
	}
}