const { ShewenyClient, CommandsHandler } = require('../build/index');



const client = new ShewenyClient({ intents: 'GUILDS' })
// client.loadAll().then(r => console.log(r))

client.login('Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.Q7U_VPFx_9T0Qb_mDh1Qd6fv88w')
client.on('interactionCommandCreate', () => {
	console.log('Good event');
})
const cmdHandler = new CommandsHandler(client, 'commands');
cmdHandler.loadAll('commands').then(r => console.log(r))
// const { Client } = require('discord.js');
// class MyClient extends Client {
// 	constructor(options) {
// 		super(options)
// 	}
// }

// const client = new MyClient({ intents: 'GUILDS' })
// client.login('Njg5MjExNjEwMzA0MzQ4MzMx.Xm_kVA.Q7U_VPFx_9T0Qb_mDh1Qd6fv88w')