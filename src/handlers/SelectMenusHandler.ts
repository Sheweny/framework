import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import { ShewenyClient } from "../ShewenyClient";
import { SelectMenu } from "../structures";
import type { Client } from "discord.js";
/**
 * Loads select menus.
 * @class Select Menu Handler
 */
export class SelectMenusHandler {
  private client?: ShewenyClient | Client;
  private dir: string;

  /**
   * @constructor
   * @param {string} directory - The directory of the select menus
   * @param {ShewenyClient} [client] - The client
   */
  constructor(dir: string, client?: ShewenyClient | Client, loadAll?: boolean) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
    if (loadAll) this.loadAll();
    if (client && client instanceof ShewenyClient) client.handlers.selectMenus = this;
  }

  /**
   * Register all select menus in collection
   * @public
   * @async
   * @returns {Promise<Collection<string[], SelectMenu>>} The select menus collection
   */
  public async loadAll(): Promise<Collection<string[], SelectMenu>> {
    const selectMenus: Collection<string[], SelectMenu> = new Collection();
    const baseDir = join(require.main!.path, this.dir);
    const selectmenusPaths: string[] = await readDirAndPush(baseDir);
    for (const selectmenuPath of selectmenusPaths) {
      let SM = await import(selectmenuPath);
      if (Object.keys(SM).length) {
        const key = Object.keys(SM)[0];
        SM = SM[key];
      }
      if (!SM) continue;
      const instance: SelectMenu = new SM(this.client);
      if (!instance.customId) continue;
      instance.path = selectmenuPath;
      selectMenus.set(instance.customId, instance);
    }
    if (this.client instanceof ShewenyClient) this.client.selectMenus = selectMenus;
    return selectMenus;
  }
}
