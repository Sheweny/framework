import type { ShewenyClient } from '../';
import { Manager } from '../typescript';

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
