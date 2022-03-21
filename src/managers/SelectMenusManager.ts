import { Collection } from 'discord.js';
import { BaseManager } from '.';
import { loadFiles } from '../utils/loadFiles';
import { ShewenyInformation } from '../helpers';
import type { ShewenyClient, SelectMenu } from '..';
import type { SelectMenusManagerDefaultOptions, SelectMenusManagerOptions } from '../typescript/interfaces';

/**
 * Manager for Select Menus
 */
export class SelectMenusManager extends BaseManager {
  /**
   * Default data for the buttons
   * @type {Collection<string[], Button> | undefined}
   */
  public default?: SelectMenusManagerDefaultOptions;
  /**
   * Collection of the select menus
   * @type {Collection<string[], SelectMenu> | undefined}
   */
  public selectMenus?: Collection<string[], SelectMenu> | null;

  /**
   * Constructor to manage select menus
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the select menus folder
   * @param {boolean} [loadAll] If the select menus are loaded during bot launch
   */
  constructor(client: ShewenyClient, options: SelectMenusManagerOptions) {
    super(client, options);
    this.default = {
      cooldown: options.cooldown || 0,
    };
    if (options?.loadAll) this.loadAll();
    client.managers.selectMenus = this;
  }

  /**
   * Load all select menus in collection
   * @returns {Promise<Collection<string[], SelectMenu>>}
   */
  public async loadAll(): Promise<Collection<string[], SelectMenu> | undefined> {
    const selectMenus = await loadFiles<string[], SelectMenu>(this.client, {
      directory: this.directory,
      key: 'customId',
    });
    if (selectMenus) this.client.collections.selectMenus = selectMenus;
    this.selectMenus = selectMenus;
    new ShewenyInformation(this.client, `- Select-menus loaded : ${this.client.collections.selectMenus.size}`);
    return selectMenus;
  }

  /**
   * Unload all selectMenus
   * @returns {void}
   */
  public unloadAll(): void {
    this.selectMenus = null;
    this.client.collections.selectMenus.clear();
  }
}
