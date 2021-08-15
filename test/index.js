const { ShewenyClient } = require('../build/index');


const client = new ShewenyClient({
	intents: ['GUILDS', 'GUILDS_MESSAGES'],
})