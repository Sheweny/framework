import { Collection } from "discord.js";
import { join } from "path";
import type { ShewenyClient } from "../client/Client";
import type { SelectMenu } from "../structures/SelectMenu";
import { readDirAndPush } from "../utils/readDirFiles";

export class SelectMenusManager {
  private client: ShewenyClient;
  public directory: string;
  public selectMenus?: Collection<string[], SelectMenu>;

  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;
    if (loadAll) this.loadAll();
    client.handlers.manager.interactions.selectMenus = this;
  }

  public async loadAll(): Promise<Collection<string[], SelectMenu>> {
    const selectMenus = new Collection<string[], SelectMenu>();
    const baseDir = join(require.main!.path, this.directory);
    const selectMenusPaths: string[] = await readDirAndPush(baseDir);

    for (const selectMenuPath of selectMenusPaths) {
      const selectMenuImport = await import(selectMenuPath);
      const key = Object.keys(selectMenuImport)[0];
      const SelectMenu = selectMenuImport[key];
      if (!SelectMenu) continue;
      const instance: SelectMenu = new SelectMenu(this.client);
      if (!instance.customId) continue;
      instance.path = selectMenuPath;
      selectMenus.set(instance.customId, instance);
    }

    this.client.handlers.collections.interactions.selectMenus = selectMenus;
    this.selectMenus = selectMenus;
    return selectMenus;
  }
}
