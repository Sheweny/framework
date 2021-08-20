import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import { ShewenyClient } from "../ShewenyClient";
import { SelectMenu } from "../structures";

/**
 * Loads select menus.
 * @class Select Menu Handler
 */
export class SelectMenusHandler {
  private client?: ShewenyClient;
  private dir: string;

  /**
   * @constructor
   * @param {string} directory - The directory of the select menus
   * @param {ShewenyClient} [client] - The client
   */
  constructor(dir: string, client?: ShewenyClient, registerAll?: boolean) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
    if (registerAll) this.registerAll();
  }

  /**
   * Register all select menus in collection
   * @public
   * @async
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
      const instance: SelectMenu = new SelectMenu(this.client);
      if (!instance.customId) continue;
      instance.path = selectmenuPath;
      selectMenus.set(instance.customId, instance);
    }
    if (this.client) this.client.selectMenus = selectMenus;
    return selectMenus;
  }
}
