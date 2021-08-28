import { Collection } from "collection-data";
import { join } from "path";
import { readDirAndPush } from "../utils/readDirFiles";
import type { ShewenyClient, SelectMenu } from "..";

/**
 * Manager for Select Menus
 */
export class SelectMenusManager {
  /**
   * Client framework
   * @type {ShewenyClient}
   */
  private client: ShewenyClient;

  /**
   * Directory of the select menus folder
   * @type {string}
   */
  public directory: string;

  /**
   * Collection of the select menus
   * @type {Collection<string[], SelectMenu> | undefined}
   */
  public selectMenus?: Collection<string[], SelectMenu>;

  /**
   * Constructor to manage select menus
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the select menus folder
   * @param {boolean} [loadAll] If the select menus are loaded during bot launch
   */
  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;
    if (loadAll) this.loadAll();
    client.handlers.selectMenus = this;
  }

  /**
   * Load all select menus in collection
   * @returns {Promise<Collection<string[], SelectMenu>>}
   */
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

    this.client.collections.selectMenus = selectMenus;
    this.selectMenus = selectMenus;
    return selectMenus;
  }
}
