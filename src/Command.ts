import type { ApplicationCommandData } from 'discord.js';
import { ICommandMeta } from './typescript/CommandsInterfaces';
export class Command {
	public client;
	public util;
	public path: string | undefined;
	public name: string;
	public description: string;
	public type: string | undefined;
	public aliases: string[] = [];
	public options: Array<ApplicationCommandData> | undefined;
	public category: string = 'Bot';
	public cooldown: number = 0;
	public userPermissions: string[] = [];
	public botPermissions: string[] = [];
	public subCommands: string[] = [];
	public defaultPermissions: boolean | undefined;
	constructor(client: any, name: string, options: ICommandMeta) {
		this.client = client;
		this.util = this.client.util;
		this.name = name;
		this.description = options.description;
		this.type = options.type;
		if (options.aliases) this.aliases = options.aliases;
		this.options = options.options;
		this.category = options.category;
		if (options.cooldown) this.cooldown = options.cooldown;
		if (options.userPermissions) this.userPermissions = options.userPermissions;
		if (options.botPermissions) this.botPermissions = options.botPermissions;
		if (options.subCommands) this.subCommands = options.subCommands;
		this.defaultPermissions = options.defaultPermissions;
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