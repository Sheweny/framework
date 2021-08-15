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
client.handlers.commands.registerAll()
client.login('Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.Q7U_VPFx_9T0Qb_mDh1Qd6fv88w')
