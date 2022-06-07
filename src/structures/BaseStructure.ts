import type { ShewenyClient } from '../';
import type { Manager } from '../typescript/index.js';

/**
 * The base class for all structures
 */
export abstract class BaseStructure {
  /**
   * Client framework
   * @type {ShewenyClient}
   */
  public client: ShewenyClient;

  /**
   * The structure is loadable by the Loader
   * @internal
   * @type {string}
   */
  static readonly _id: string = 'ShewenyLoadable';
  /**
   * Path to file
   * @type {string}
   */
  public path?: string;

  /**
   * Manager of the structure
   * @type {Manager}
   */
  public manager?: Manager;
  /**
   * Constructor for build base of any structures
   * @param {ShewenyClient} client Client framework
   */
  constructor(client: ShewenyClient) {
    this.client = client as ShewenyClient;
  }
}
