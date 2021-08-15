import { readdirSync } from 'fs';
import { join } from 'path';
import { Client } from 'discord.js';

import { CommandsHandler, EventsHandler } from './index';
import type { Event } from './index';
import type { Command } from './typescript/CommandsInterfaces'

import type { ClientOptions } from 'discord.js';
import { Collection } from 'collection-data'




interface IOptions extends ClientOptions {
	handlers: {
		commands: string;
		events: string;
	}
	commands: Collection<string, Command>;
	events: Collection<string, Event>;
	admins: string[];
}

export class ShewenyClient extends Client {
	shewenyOptions: IOptions;
	admins: string[] | undefined;
	handlers: any = {};
	commands: Collection<string, Command> | undefined = new Collection();
	events: Collection<string, Event> | undefined = new Collection();
	commandsType: string | undefined;
	cooldowns: Collection<string, any> = new Collection();
	constructor(options: IOptions) {
		super(options)
		this.shewenyOptions = options;
		if (options.admins) this.admins = options.admins
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
	awaitReady(): Promise<void> {
		return new Promise((resolve) => {
			if (this.isReady()) return resolve()
			const that: ShewenyClient = this
			that.once('ready', () => resolve())
		})
	}
}