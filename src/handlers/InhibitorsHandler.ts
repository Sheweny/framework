import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import type { ShewenyClient } from "..";
import { Inhibitor } from "../typescript/interfaces/interfaces";

/**
 * Loads inhibitors.
 * @class
 */
export class InhibitorsHandler {
  private client: ShewenyClient | undefined;
  private dir: string;

  /**
   * @param {string} directory - The directory of the inhibitors
   * @param {ShewenyClient} [client] - The client
   */
  constructor(dir: string, client?: ShewenyClient, registerAll?: boolean) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
    this.registerAll();
    if (registerAll) this.registerAll();
  }

  /**
   * Register all inhibitors in collection
   * @returns {Promise<Collection<string, Event>>} The inhibitors collection
   */
  public async registerAll(): Promise<Collection<string, Inhibitor>> {
    const inhibitors = new Collection<string, Inhibitor>();
    const baseDir = join(require.main!.path, this.dir);
    const inhibitorsPaths: string[] = await readDirAndPush(baseDir);
    for (const inhibitorPath of inhibitorsPaths) {
      const inhibitorImport = await import(inhibitorPath);
      const key = Object.keys(inhibitorImport)[0];
      const Inhibitor = inhibitorImport[key];
      if (!Inhibitor) continue;
      const instance = new Inhibitor(this.client);
      if (!instance.name) continue;
      instance.path = inhibitorPath;
      inhibitors.set(instance.name, instance);
    }

    if (this.client) this.client.inhibitors = inhibitors;
    return inhibitors;
  }
}
