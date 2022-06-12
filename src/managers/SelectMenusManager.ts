import { Loader } from '../utils/Loader.js';
import { ShewenyInformation } from '../helpers/index.js';
import { BaseManager } from './index.js';
import { SelectMenu } from '../structures/index.js';
import { Collection } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { CustomId, SelectMenusManagerDefaultOptions, SelectMenusManagerOptions } from '../typescript/index.js';

/**
 * Manager for Select Menus
 */
export class SelectMenusManager extends BaseManager {
  /**
   * Default data for the buttons
   * @type {SelectMenusManagerDefaultOptions}
   */
  public default?: SelectMenusManagerDefaultOptions;

  /**
   * Collection of the select menus
   * @type {Collection<CustomId, SelectMenu[]> | undefined}
   */
  public selectMenus?: Collection<CustomId, SelectMenu[]>;

  /**
   * Constructor to manage select menus
   * @param {ShewenyClient} [client] Client framework
   * @param {SelectMenusManagerOptions} [options] The options of the manager
   */
  constructor(client: ShewenyClient, options: SelectMenusManagerOptions) {
    super(client, options);
    this.default = {
      cooldown: options.default?.cooldown || 0,
    };
  }

  /**
   * Load all select menus in collection
   * @returns {Promise<Collection<string[], SelectMenu[]> | undefined>}
   */
  public async loadAll(): Promise<Collection<CustomId, SelectMenu[]> | undefined> {
    const loader = new Loader<'customId', CustomId, SelectMenu>(this.client, this.directory, 'customId', {
      manager: this,
      instance: SelectMenu,
    });
    this.selectMenus = await loader.load();
    new ShewenyInformation(this.client, `- Select-menus loaded : ${this.selectMenus.size}`);
    return this.selectMenus;
  }

  /**
   * Unload all selectMenus
   * @returns {void}
   */
  public unloadAll(): void {
    this.selectMenus = new Collection();
    this.client.collections.selectMenus.clear();
  }
}
