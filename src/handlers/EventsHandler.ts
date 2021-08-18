import { readdir, stat } from "fs/promises";
import { join } from "path";
import type { ShewenyClient } from "../index";

/**
 * Loads events.
 * @class
 */
export class EventsHandler {
  private client: ShewenyClient;
  private dir: string;

  /**
   * @param {ShewenyClient} client - The client
   * @param {string} directory - The directory of the events
   */
  constructor(client: ShewenyClient, dir: string) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
  }

  /**
   * Register all events in collection
   * @returns {Collection<string, Event>}
   */
  async registerAll() {
    const baseDir = join(require.main!.path, this.dir);
    const evtsPaths: string[] = await this._readDirAndPush(baseDir);
    for (const evtPath of evtsPaths) {
      const Event = (await import(evtPath)).default;
      if (!Event) continue;
      const instance = new Event(this.client);
      if (!instance.name) continue;
      instance.path = evtPath;
      this.client.events.set(instance.name, instance);
    }
    return this.client.events;
  }
  /**
   * Load all events and register them in collection if no events are registered
   * @returns {Collection<string, Event>}
   */
  async loadAll() {
    if (!this.client.events) await this.registerAll();
    for (const [name, evt] of this.client.events) {
      this.client.on(name, (...args: any[]) => evt.execute(args));
    }
  }
  /**
   * Read dir and return array with all paths of files
   * @param {string} directory - The directory to read
   * @returns {Array<string>}
   */
  async _readDirAndPush(d: string): Promise<Array<string>> {
    const files: string[] = [];
    async function read(dir: string) {
      const result = await readdir(dir);
      for (const item of result) {
        const infos = await stat(join(dir, item));
        if (infos.isDirectory()) await read(join(dir, item));
        else files.push(join(dir, item));
      }
      return;
    }

    await read(d);

    return files;
  }
}
