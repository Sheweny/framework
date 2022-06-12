import { EventEmitter } from 'events';
import type { ShewenyClient } from '../client/Client.js';
import type { BaseManagerOptions } from '../typescript/index.js';

export class BaseManager extends EventEmitter {
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
   * Constructor of BaseManager class (extends EventEmitter)
   * @param {ShewenyClient} client
   * @param {BaseManagerOptions} options
   */
  constructor(client: ShewenyClient, options: BaseManagerOptions) {
    super();
    if (!client) throw new TypeError('Client must be provided.');
    if (!options || (options && !options?.directory)) throw new TypeError('Directory must be provided.');

    this.client = client;
    this.directory = options.directory;
  }
}
