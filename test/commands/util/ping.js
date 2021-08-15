const { Command } = require('../../../build')
class default_1 extends Command {
	constructor(spiritus) {
		super(spiritus, 'pingss', {
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
	async execute(interaction) {
		const debut = Date.now();
		interaction.reply('Pong !')
			.then(async () => await interaction.editReply(`Pong  BOT : \`${Date.now() - debut}ms\` API : \`${this.spiritus.client.ws.ping}ms\``));
	}
}
exports.default = default_1;