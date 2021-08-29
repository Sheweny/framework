import { Collection } from "collection-data";
import { join } from "path";
import { loadFiles } from "../utils/loadFiles";
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
    const selectMenus = await loadFiles<string[], SelectMenu>(
      this.client,
      this.directory
    );
    this.client.collections.selectMenus = selectMenus;
    this.selectMenus = selectMenus;
    return selectMenus;
  }
}
