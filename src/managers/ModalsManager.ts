import { Loader } from '../utils/Loader.js';
import { ShewenyInformation } from '../helpers/index.js';
import { BaseManager } from './index.js';
import { Modal } from '../structures/index.js';
import { Collection } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { CustomId, ModalsManagerDefaultOptions, ModalsManagerOptions } from '../typescript/index.js';
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
  public modals?: Collection<CustomId, Modal[]>;

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
  public async loadAll(): Promise<Collection<CustomId, Modal[]> | undefined> {
    const loader = new Loader<'customId', CustomId, Modal>(this.client, this.directory, 'customId', {
      manager: this,
      instance: Modal,
    });
    this.modals = await loader.load();
    new ShewenyInformation(this.client, `- Modals loaded : ${this.modals.size}`);
    return this.modals;
  }

  /**
   * Unload all modals
   * @returns {void}
   */
  public unloadAll(): void {
    this.modals = new Collection();
    this.client.collections.modals.clear();
  }
}
