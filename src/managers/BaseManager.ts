import { EventEmitter } from 'events';
import { ShewenyClient } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';

export class BaseManager extends EventEmitter {
	/**
   * Client framework
   * @type {ShewenyClient}
   */
	public client: ShewenyClient;

	/**
   * Directory to load
   * @type {string}
   */
	public directory: string;

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
