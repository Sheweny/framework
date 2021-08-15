const { ShewenyClient } = require('../build/index');


const client = new ShewenyClient({
	intents: ['GUILDS', 'GUILDS_MESSAGES'],
	handlers: {
		commands: {
			directory: "./commands",
			type: "SLASH_COMMANDS"
		}
	}
})