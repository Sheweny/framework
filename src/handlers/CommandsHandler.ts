import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { Collection } from 'collection-data';
import { SlashHandler } from '../index';
import type { IOptions } from '../typescript/interfaces/CommandHandler';
import type { ShewenyClient } from '../index'
export class CommandsHandler {
	private client: ShewenyClient;
	private dir: string;
	public slashCommands: SlashHandler | undefined;
	options: IOptions;
	constructor(client: ShewenyClient, options: IOptions) {
		if (!options.directory) throw new TypeError("Directory must be provided.")
		if (options.type && !['MESSAGE_COMMANDS', 'SLASH_COMMANDS'].includes(options.type)) throw new TypeError("Unknown type of command: " + options.type + "\nThe type must be MESSAGE_COMMANDS or SLASH_COMMANDS")
		if (!options.type) options.type = 'MESSAGE_COMMANDS';
		this.client = client;
		this.dir = options.directory;
		this.client.commands = new Collection()
		this.client.commandsType = options.type;
		this.options = options;
	}
	async loadAll() {
		const baseDir = join(require.main!.path, this.dir);
		const cmds: string[] = await this.readDirAndPush(baseDir);
		for (const cmdPath of cmds) {
			const Command = (await import(cmdPath)).default;
			if (!Command) continue;
			const instance = new Command(this.client)
			if (!instance.name) continue;
			instance.path = cmdPath;
			this.client.commands.set(instance.name, instance)
		}
		if (this.options.type === 'SLASH_COMMANDS') {
			this.slashCommands = new SlashHandler(this.client)
		}
		return this.client.commands
	}
	async readDirAndPush(d: string): Promise<Array<string>> {
		const files: string[] = []
		async function read(dir: string) {
			const result = await readdir(dir);
			for (const item of result) {
				const infos = await stat(join(dir, item));
				if (infos.isDirectory()) await read(join(dir, item))
				else files.push(join(dir, item));
			}
			return;
		}

		await read(d)

		return files;
	}
}