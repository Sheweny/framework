import { ShewenyClient, CommandsHandler } from '../../';

const client = new ShewenyClient({ intents: ["GUILDS", 'GUILD_MESSAGES'] });

const commandsHandler = new CommandsHandler(client, {
	type: 'MESSAGE_COMMANDS',
	directory: './commands'
})
commandsHandler.loadAll()
// .then(async () => {
// 	await commandsHandler.slashCommands!.registerCommands(client.commands, '809702809196560405')
// })
client.handlers.commands = commandsHandler;

client.login('')