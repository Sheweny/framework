import { Collection } from 'discord.js';
import { Loader } from '../utils/Loader';
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
   * @param {boolean} [options] The options of the manager
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
    const loader = new Loader<string[], Modal>(this.client, this.directory, "customId");
    this.modals = await loader.load();
    //TODO: Refactor for new system
    this.client.collections.modals = this.modals;
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
