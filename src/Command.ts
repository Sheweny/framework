import type { ApplicationCommandData } from 'discord.js';
import { ICommandInfosArgs, ICommandMeta } from './typescript/interfaces';
export class Command {
	protected client;
	protected util;
	protected path: string | undefined;
	protected name: string;
	protected aliases: string[] = [];
	protected options: Array<ApplicationCommandData> | undefined = [];
	protected category: string = 'Bot';
	protected description: string;
	protected cooldown: number = 0;
	protected userPermissions: string[] = [];
	protected botPermissions: string[] = [];
	protected subCommands: string[] = [];
	constructor(client: any, name: string, options: ICommandMeta) {
		this.client = client;
		this.util = this.client.util;
		this.name = name
		this.aliases = options.aliases
		this.options = options.options
		this.category = options.category
		this.description = options.description
		this.cooldown = options.cooldown
		this.userPermissions = options.userPermissions
		this.botPermissions = options.botPermissions
		this.subCommands = options.subCommands
	}
	before() {

	}
	unregister() {
		this.client.commands.delete(this.name);
		delete require.cache[require.resolve(this.path!)];
		return true;
	}
	async reload() {
		if (this.path) {
			this.unregister();
			return this.register();
		}
		return null;
	}
	async register() {
		const Command = (await import(this.path!)).default;
		const cmd = new Command(this.client)
		return this.client.commands.set(cmd.name, cmd)
	}
}