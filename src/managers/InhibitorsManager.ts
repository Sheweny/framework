import { Collection } from 'collection-data';
import { loadFiles } from '../utils/loadFiles';
import type { ShewenyClient, Inhibitor } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';

/**
 * Manager for Inhibitors
 */
export class InhibitorsManager {
  /**
   * Client framework
   * @type {ShewenyClient}
   */
  private client: ShewenyClient;

  /**
   * Directory of the inhibitors folder
   * @type {string}
   */
  public directory: string;

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
    if (!client) throw new TypeError('Client must be provided.');
    if (!options || (options && !options.directory)) throw new TypeError('Directory must be provided.');

    this.client = client;
    this.directory = options.directory;

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
