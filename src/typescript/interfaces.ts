import type { ApplicationCommandData } from 'discord.js';
export interface ICommandMeta {
	description: string;
	aliases: string[];
	options?: Array<ApplicationCommandData>;
	category: string;
	cooldown: number;
	userPermissions: string[];
	botPermissions: string[];
	subCommands: any[]
}

export interface ICommandInfosArgs {
	name: string;
	description: string;
	type: string;
	required: boolean;
}

export interface IEventMeta {
	name: string;
	description: string;
	once: boolean;
}