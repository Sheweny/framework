import { readdirSync } from 'fs';
import { join } from 'path';
import { Client } from 'discord.js';

import { CommandsHandler, EventsHandler } from './index';
import type { Command, Event } from './index';


import type { ClientOptions } from 'discord.js';
import type { Collection } from 'collection-data'




interface IOptions extends ClientOptions {
	handlers: {
		commands: string;
		events: string;
	}
	commands: Collection<string, Command>;
	events: Collection<string, Event>;
}

export class ShewenyClient extends Client {
	shewenyOptions: IOptions;
	handlers: any;
	constructor(options: IOptions) {
		super(options)
		this.shewenyOptions = options;
		if (options.handlers) {
			if (options.handlers.commands) {
				this.handlers.commands = new CommandsHandler(this, options.handlers.commands)
			}
			if (options.handlers.events) {
				this.handlers.events = new EventsHandler(this, options.handlers.events)
			}
		}
		this.init()
	}
	async init(dir = join(__dirname, "./events")) {
		readdirSync(dir).forEach(async file => {
			const event = await import(`${dir}/${file}`).then(e => e.default)
			const evtName = file.split(".")[0];
			this.on(evtName, (...args) => event(this, ...args));
			console.log(`Event loaded: ${evtName}`);
		});
	};

}