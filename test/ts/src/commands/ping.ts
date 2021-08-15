import { Command, ShewenyClient } from '../../../..'

class Ping extends Command {
	constructor(client: typeof ShewenyClient) {
		super(client, 'pingsss', {
			aliases: [],
			options: [],
			description: 'Get ping of the bot',
			category: 'Other',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		});
	}
	async execute(interaction: any) {
		const debut = Date.now();
		interaction.reply('Pong !')
			.then(async () => await interaction.editReply(`Pong  BOT : \`${Date.now() - debut}ms\` API : \`${this.client.ws?.ping}ms\``));
	}
}
exports.default = Ping;