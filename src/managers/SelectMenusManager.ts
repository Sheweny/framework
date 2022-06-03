import { Collection } from 'discord.js';
import { BaseManager } from '.';
import { ShewenyInformation } from '../helpers';
import { Loader } from '../utils/Loader';
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
   * @returns {Promise<Collection<string[], SelectMenu>>}
   */
  public async loadAll(): Promise<Collection<string[], SelectMenu> | undefined> {
    const loader = new Loader<string[], SelectMenu>(this.client, this.directory, "customId");
    this.selectMenus = await loader.load();
    new ShewenyInformation(this.client, `- Select-menus loaded : ${this.selectMenus.size}`);
    return this.selectMenus;

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
