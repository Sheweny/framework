import { Collection } from 'discord.js';
import { BaseManager } from '.';
import { loadFiles } from '../utils/loadFiles';
import { ShewenyInformation } from '../helpers';
import { INHIBITOR_TYPE } from '../constants/constants';
import type { ShewenyClient, Inhibitor } from '..';
import type { InhibitorsManagerOptions, InhibitorsManagerDefaultOptions } from '../typescript/interfaces';

/**
 * Manager for Inhibitors
 */
export class InhibitorsManager extends BaseManager {
	/**
   * Default data for the inhibitors
   * @type {InhibitorsManagerDefaultOptions}
   */
	public default: InhibitorsManagerDefaultOptions;

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
	constructor(client: ShewenyClient, options: InhibitorsManagerOptions) {
		super(client, options);
		this.default = {
			priority: options.default?.priority || 0,
			type: options.default?.type || [INHIBITOR_TYPE.message],
		};
		if (options?.loadAll) this.loadAll();
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
