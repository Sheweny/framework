import { Collection } from 'discord.js';
import { Loader } from '../utils/Loader';
import { ShewenyInformation } from '../helpers';
import { BaseManager } from './index';
import type { ShewenyClient } from '../client/Client';
import type { Modal } from '../structures';
import type { CustomId, ModalsManagerDefaultOptions, ModalsManagerOptions } from '../typescript';
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
  public modals?: Collection<CustomId, Modal> | null;

  /**
   * Constructor to manage modals
   * @param {ShewenyClient} client Client framework
   * @param {boolean} [options] The options of the manager
   */
  constructor(client: ShewenyClient, options: ModalsManagerOptions) {
    super(client, options);
    this.default = {
      cooldown: options.default?.cooldown || 0,
    };
  }

  /**
   * Load all modals in collection
   * @returns {Promise<Collection<string[], Modal>>}
   */
  public async loadAll(): Promise<Collection<CustomId, Modal> | undefined> {
    const loader = new Loader<'customId', CustomId, Modal>(this.client, this.directory, 'customId');
    this.modals = await loader.load();
    new ShewenyInformation(this.client, `- Modals loaded : ${this.modals.size}`);
    return this.modals;
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
