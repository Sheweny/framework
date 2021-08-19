import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import type { ShewenyClient } from "../index";
import { SelectMenu } from "../structures/SelectMenu";

/**
 * Loads select menus.
 * @class
 */
export class SelectMenusHandler {
  private client: ShewenyClient;
  private dir: string;

  /**
   * @param {ShewenyClient} client - The client
   * @param {string} directory - The directory of the select menus
   */
  constructor(client: ShewenyClient, dir: string) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
  }

  /**
   * Register all select menus in collection
   * @returns {Promise<Collection<string[], SelectMenu>>} The select menus collection
   */
  public async registerAll(): Promise<Collection<string[], SelectMenu>> {
    const baseDir = join(require.main!.path, this.dir);
    const selectmenusPaths: string[] = await readDirAndPush(baseDir);
    for (const selectmenuPath of selectmenusPaths) {
      const SelectMenu = (await import(selectmenuPath)).default;
      if (!SelectMenu) continue;
      const instance = new SelectMenu(this.client);
      if (!instance.customId) continue;
      instance.path = selectmenuPath;
      this.client.selectMenus.set(instance.name, instance);
    }
    return this.client.selectMenus;
  }
}
