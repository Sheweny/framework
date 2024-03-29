import { EventEmitter } from 'events';
import type { Collection } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { BaseManagerOptions } from '../typescript/index.js';

export abstract class BaseManager extends EventEmitter {
  /**
   * Directory to load
   * @type {boolean}
   */
  public readonly asyncRead: boolean;
  /**
   * Client framework
   * @type {ShewenyClient}
   */
  public readonly client: ShewenyClient;

  /**
   * Directory to load
   * @type {string}
   */
  public readonly directory: string;

  /**
   * Load all structures in collection
   * @returns {Promise<Collection<K, V[]> | undefined>}
   */
  public abstract loadAll(): Promise<Collection<unknown, unknown[]> | undefined>;

  /**
   * Constructor of BaseManager class (extends EventEmitter)
   * @param {ShewenyClient} [client]
   * @param {BaseManagerOptions} [options]
   */
  constructor(client: ShewenyClient, options: BaseManagerOptions) {
    super();
    if (!client) throw new TypeError('Client must be provided.');
    if (!options || (options && !options?.directory)) throw new TypeError('Directory must be provided.');

    this.asyncRead = options.asyncRead ?? false;
    this.client = client;
    this.directory = options.directory;
  }
}
