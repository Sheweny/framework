import { Collection } from "collection-data";
import { join } from "path";
import { readDirAndPush } from "../utils/readDirFiles";
import type { ShewenyClient, Inhibitor } from "..";

/**
 * Manager for Inhibitors
 */
export class InhibitorsManager {
  /**
   * Client framework
   * @type {ShewenyClient}
   */
  private client: ShewenyClient;

  /**
   * Directory of the inhibitors folder
   * @type {string}
   */
  public directory: string;

  /**
   * Collection of the inhibitors
   * @type {Collection<string, Inhibitor> | undefined}
   */
  public inhibitors?: Collection<string, Inhibitor>;

  /**
   * Constructor to manage inhibitors
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the inhibitors folder
   * @param {boolean} [loadAll] If the inhibitors are loaded during bot launch
   */
  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;

    if (loadAll) this.loadAll();

    client.handlers.inhibitors = this;
  }

  /**
   * Load all inhibitors in collection
   * @returns {Promise<Collection<string, Inhibitor>>}
   */
  public async loadAll(): Promise<Collection<string, Inhibitor>> {
    const inhibitors = new Collection<string, Inhibitor>();
    const baseDir = join(require.main!.path, this.directory);
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

    this.client.collections.inhibitors = inhibitors;
    this.inhibitors = inhibitors;

    return inhibitors;
  }
}
