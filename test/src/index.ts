import { ShewenyClient, CommandsHandler } from '../../';

const client = new ShewenyClient({ intents: ["GUILDS"] });

const commandsHandler = new CommandsHandler(client, {
	type: 'SLASH_COMMANDS',
	directory: './commands'
})
commandsHandler.loadAll().then(async () => {
	await commandsHandler.slashCommands!.registerCommands(client.commands, '809702809196560405')
})
client.handlers.commands = commandsHandler;

client.login('Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.Q7U_VPFx_9T0Qb_mDh1Qd6fv88w')