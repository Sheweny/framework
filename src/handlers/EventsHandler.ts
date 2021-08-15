import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { Collection } from 'collection-data';
export class EventsHandler {
	private client: any;
	private dir: string;
	constructor(client: any, dir: string) {
		if (!dir) throw new TypeError("Directory must be provided.")
		this.client = client;
		this.dir = dir;
		this.client.events = new Collection()
	}
	async loadAll() {
		const baseDir = join(require.main!.path, this.dir);
		const evtsPaths: string[] = await this.readDirAndPush(baseDir);
		for (const evtPath of evtsPaths) {
			const Event = (await import(evtPath)).default;
			if (!Event) continue;
			const instance = new Event(this.client)
			if (!instance.name) continue;
			instance.path = evtPath;
			this.client.events.set(instance.name, instance)
		}
		return this.client.events
	}
	async registerAll() {
		for (const [name, evt] of this.client.events) {
			this.client.on(name, (...args: any) => evt.execute(args));
		}
	}
	async readDirAndPush(d: string): Promise<Array<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>> {
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