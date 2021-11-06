import { Collection } from 'collection-data';
import { loadFiles } from '../utils/loadFiles';
import type { ShewenyClient, SelectMenu } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';

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
  constructor(client: ShewenyClient, options: BaseManagerOptions) {
    if (!client) throw new TypeError('Client must be provided.');
    if (!options || (options && !options.directory)) throw new TypeError('Directory must be provided.');

    this.client = client;
    this.directory = options.directory;
    if (options?.loadAll) this.loadAll();
    client.managers.selectMenus = this;
  }

  /**
   * Load all select menus in collection
   * @returns {Promise<Collection<string[], SelectMenu>>}
   */
  public async loadAll(): Promise<Collection<string[], SelectMenu> | undefined> {
    const selectMenus = await loadFiles<string[], SelectMenu>(this.client, this.directory, 'customId');
    this.client.collections.selectMenus = selectMenus;
    this.selectMenus = selectMenus;
    return selectMenus;
  }
}
