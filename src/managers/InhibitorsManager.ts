import { Collection } from 'discord.js';
import { loadFiles } from '../utils/loadFiles';
import { BaseManager } from '.';
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
  public inhibitors?: Collection<string, Inhibitor>;

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
    const inhibitors = await loadFiles<string, Inhibitor>(this.client, this.directory, 'name');
    this.client.collections.inhibitors = inhibitors;
    this.inhibitors = inhibitors;
    return inhibitors;
  }
}
