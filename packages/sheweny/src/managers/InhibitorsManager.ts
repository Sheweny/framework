import { Loader } from '../utils/Loader.js';
import { ShewenyInformation } from '../helpers/index.js';
import { BaseManager } from './index.js';
import { Inhibitor } from '../structures/index.js';
import { Collection } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { InhibitorsManagerOptions, InhibitorsManagerDefaultOptions } from '../typescript/index.js';

/**
 * Manager for Inhibitors
 */
export class InhibitorsManager extends BaseManager {
  /**
   * Default data for the inhibitors
   * @type {InhibitorsManagerDefaultOptions}
   */
  public default: InhibitorsManagerDefaultOptions;

  /**
   * Collection of the inhibitors
   * @type {Collection<string, Inhibitor[]> | undefined}
   */
  public inhibitors?: Collection<string, Inhibitor[]>;

  /**
   * Constructor to manage inhibitors
   * @param {ShewenyClient} [client] Client framework
   * @param {boolean} [options] The options of the manager
   */
  constructor(client: ShewenyClient, options: InhibitorsManagerOptions) {
    super(client, options);
    this.default = {
      priority: options.default?.priority,
      type: options.default?.type,
    };
  }

  /**
   * Load all inhibitors in collection
   * @returns {Promise<Collection<string, Inhibitor[]> | undefined>}
   */
  public async loadAll(): Promise<Collection<string, Inhibitor[]> | undefined> {
    const loader = new Loader<'name', string, Inhibitor>(this.client, this.directory, 'name', {
      manager: this,
      instance: Inhibitor,
      asyncRead: this.asyncRead,
    });
    this.inhibitors = await loader.load();
    new ShewenyInformation(this.client, `- Inhibitors loaded : ${this.inhibitors.size}`);
    return this.inhibitors;
  }

  /**
   * Unload all inhibitors
   * @returns {void}
   */
  public unloadAll(): void {
    this.inhibitors = new Collection();
    this.client.collections.inhibitors.clear();
  }
}
