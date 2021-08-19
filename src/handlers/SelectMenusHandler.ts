import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import type { ShewenyClient } from "..";
import { SelectMenu } from "../typescript/interfaces/interfaces";

/**
 * Loads select menus.
 * @class
 */
export class SelectMenusHandler {
  private client: ShewenyClient | undefined;
  private dir: string;

  /**
   * @param {string} directory - The directory of the select menus
   * @param {ShewenyClient} [client] - The client
   */
  constructor(dir: string, client?: ShewenyClient) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
  }

  /**
   * Register all select menus in collection
   * @returns {Promise<Collection<string[], SelectMenu>>} The select menus collection
   */
  public async registerAll(): Promise<Collection<string[], SelectMenu>> {
    const selectMenus: Collection<string[], SelectMenu> = new Collection();
    const baseDir = join(require.main!.path, this.dir);
    const selectmenusPaths: string[] = await readDirAndPush(baseDir);
    for (const selectmenuPath of selectmenusPaths) {
      const selectMenyImport = await import(selectmenuPath);
      const key = Object.keys(selectMenyImport)[0];
      const SelectMenu = selectMenyImport[key];
      if (!SelectMenu) continue;
      const instance = new SelectMenu(this.client);
      if (!instance.customId) continue;
      instance.path = selectmenuPath;
      selectMenus.set(instance.customId, instance);
    }
    if (this.client) this.client.selectMenus = selectMenus;
    return selectMenus;
  }
}
