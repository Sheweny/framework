import type { ShewenyClient } from '../';

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
   * Constructor for build base of any structures
   * @param {ShewenyClient} client Client framework
   * @param {string} [path] Path for the structure
   */
	constructor(client: ShewenyClient | any, path?: string) {
		this.client = client as ShewenyClient;
		this.path = path;
	}
}
