import { Collection } from 'discord.js';
import { loadFiles } from '../utils/loadFiles';
import { BaseManager } from '.';
import { ShewenyInformation } from '../helpers';
import type { ShewenyClient, Modal } from '..';
import type { ModalsManagerDefaultOptions, ModalsManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Modals
 */
export class ModalsManager extends BaseManager {
  /**
   * Default data for the buttons
   * @type {Collection<string[], Button> | undefined}
   */
  public default?: ModalsManagerDefaultOptions;

  /**
   * Collection of modals
   * @type {Collection<string[], Modal> | undefined}
   */
  public modals?: Collection<string[], Modal> | null;

  /**
   * Constructor to manage modals
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the modals folder
   * @param {boolean} [loadAll] If the modals are loaded during bot launch
   */
  constructor(client: ShewenyClient, options: ModalsManagerOptions) {
    super(client, options);
    this.default = {
      cooldown: options.default?.cooldown || 0,
    };
    if (options?.loadAll) this.loadAll();
  }

  /**
   * Load all modals in collection
   * @returns {Promise<Collection<string[], Modal>>}
   */
  public async loadAll(): Promise<Collection<string[], Modal> | undefined> {
    const modals = await loadFiles<string[], Modal>(this.client, {
      directory: this.directory,
      key: 'customId',
    });
    if (modals) {
      this.client.collections.modals = modals;
      this.modals = modals;
    }
    new ShewenyInformation(this.client, `- Modals loaded : ${this.client.collections.modals.size}`);
    return modals;
  }

  /**
   * Unload all modals
   * @returns {void}
   */
  public unloadAll(): void {
    this.modals = null;
    this.client.collections.modals.clear();
  }
}
