import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { Collection } from 'collection-data';
export class CommandsHandler {
	private client: any;
	private dir: string;
	constructor(client: any, dir: string) {
		if (!dir) throw new TypeError("Directory must be provided.")
		this.client = client;
		this.dir = dir;
		this.client.commands = new Collection()
	}
	async registerAll() {
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
		return this.client.commands
	}
	async readDirAndPush(d: string): Promise<Array<string>> {
		const files: any = []
		async function read(dir: string) {
			const data: any[] = []
			const result = await readdir(dir);
			for (const item of result) {
				const infos = await stat(join(dir, item));
				if (infos.isDirectory()) await read(join(dir, item))
				else files.push(join(dir, item));
			}
			return data;
		}

		await read(d)

		return files;
	}
}