import { ICommandMeta } from './typescript/interfaces/Command';
import type { ApplicationCommandOptionData, ApplicationCommand } from 'discord.js';
import type { ShewenyClient } from './index'
export class Command {
	public client;
	public path: string | undefined;
	public name: string;
	public description: string;
	public type: ApplicationCommand | undefined;
	public aliases: string[] = [];
	public options: Array<ApplicationCommandOptionData> | undefined;
	public category: string = 'Bot';
	public cooldown: number = 0;
	public userPermissions: string[] = [];
	public botPermissions: string[] = [];
	public subCommands: string[] = [];
	public defaultPermission: boolean | undefined;
	constructor(client: ShewenyClient, name: string, options: ICommandMeta) {
		this.client = client;
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
		this.defaultPermission = options.defaultPermission;
	}

	unregister() {
		this.client.commands?.delete(this.name);
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
		return this.client.commands?.set(cmd.name, cmd)
	}
}