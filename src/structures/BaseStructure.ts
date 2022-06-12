import type { ShewenyClient } from '../';
import type { Manager } from '../typescript/index.js';

/**
 * The base class for all structures
 */
export abstract class BaseStructure {
  /**
   * The structure is loadable by the Loader
   * @internal
   * @type {string}
   */
  static readonly _id: string = 'ShewenyLoadable';

  /**
   * Client framework
   * @type {ShewenyClient}
   */
  public readonly client: ShewenyClient;

  /**
   * If the structure is enabled or not
   * @type {boolean}
   */
  public enabled: boolean;

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
  constructor(client: ShewenyClient, enabled = true) {
    this.client = client as ShewenyClient;
    this.enabled = enabled;
  }
  /**
   * Enable this structure
   */
  public enable() {
    this.enabled = true;
  }
  /**
   * Disable this structure
   */
  public disable() {
    this.enabled = false;
  }
}
