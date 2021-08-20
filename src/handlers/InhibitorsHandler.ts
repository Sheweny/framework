import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import { ShewenyClient } from "../ShewenyClient";
import { Inhibitor } from "../structures";

/**
 * Loads inhibitors.
 * @class
 */
export class InhibitorsHandler {
  private client?: ShewenyClient;
  private dir: string;

  /**
   * @constructor
   * @param {string} dir - The directory of the inhibitors
   * @param {ShewenyClient} [client] - The client
   * @param {boolean} [registerAll] - Register all inhibitors in collection
   */
  constructor(dir: string, client?: ShewenyClient, registerAll?: boolean) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
    if (registerAll) this.registerAll();
  }

  /**
   * Register all inhibitors in collection
   * @public
   * @async
   * @returns {Promise<Collection<string, Inhibitor>>} The inhibitors collection
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
      const instance: Inhibitor = new Inhibitor(this.client);
      if (!instance.name) continue;
      instance.path = inhibitorPath;
      inhibitors.set(instance.name, instance);
    }

    if (this.client) this.client.inhibitors = inhibitors;
    return inhibitors;
  }
}
