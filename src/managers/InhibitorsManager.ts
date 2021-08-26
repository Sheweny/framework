import { Collection } from "collection-data";
import { join } from "path";
import { ShewenyClient } from "../client/Client";
import { Inhibitor } from "../structures/Inhibitor";
import { readDirAndPush } from "../utils/readDirFiles";

export class InhibitorsManager {
  private client: ShewenyClient;
  public directory: string;
  public inhibitors?: Collection<string, Inhibitor>;

  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;

    if (loadAll) this.loadAll();

    client.handlers.inhibitors = this;
  }

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
