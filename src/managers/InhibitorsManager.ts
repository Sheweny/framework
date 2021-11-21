import { Collection } from 'discord.js';
import { BaseManager } from '.';
import { loadFiles } from '../utils/loadFiles';
import { ShewenyInformation } from '../helpers';
import type { ShewenyClient, Inhibitor } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';

/**
 * Manager for Inhibitors
 */
export class InhibitorsManager extends BaseManager {
  /**
   * Collection of the inhibitors
   * @type {Collection<string, Inhibitor> | undefined}
   */
  public inhibitors?: Collection<string, Inhibitor> | null;

  /**
   * Constructor to manage inhibitors
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the inhibitors folder
   * @param {boolean} [loadAll] If the inhibitors are loaded during bot launch
   */
  constructor(client: ShewenyClient, options: BaseManagerOptions) {
    super(client, options);

    if (options?.loadAll) this.loadAll();
    client.managers.inhibitors = this;
  }

  /**
   * Load all inhibitors in collection
   * @returns {Promise<Collection<string, Inhibitor>>}
   */
  public async loadAll(): Promise<Collection<string, Inhibitor> | undefined> {
    const inhibitors = await loadFiles<string, Inhibitor>(this.client, {
      directory: this.directory,
      key: 'name',
    });
    if (inhibitors) this.client.collections.inhibitors = inhibitors;
    this.inhibitors = inhibitors;
    new ShewenyInformation(this.client, `- Inhibitors loaded : ${this.client.collections.inhibitors.size}`);
    return inhibitors;
  }

  /**
   * Unload all inhibitors
   * @returns {void}
   */
  public unloadAll(): void {
    this.inhibitors = null;
    this.client.collections.inhibitors.clear();
  }
}
