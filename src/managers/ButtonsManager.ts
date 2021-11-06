import { Collection } from 'collection-data';
import { loadFiles } from '../utils/loadFiles';
import type { ShewenyClient, Button } from '..';

/**
 * Manager for Buttons
 */
export class ButtonsManager {
  /**
   * Client framework
   * @type {ShewenyClient}
   */
  private client: ShewenyClient;

  /**
   * Directory of the buttons folder
   * @type {string}
   */
  public directory: string;

  /**
   * Collection of the buttons
   * @type {Collection<string[], Button> | undefined}
   */
  public buttons?: Collection<string[], Button>;

  /**
   * Constructor to manage buttons
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the buttons folder
   * @param {boolean} [loadAll] If the buttons are loaded during bot launch
   */
  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError('Client must be provided.');
    if (!directory) throw new TypeError('Directory must be provided.');

    this.client = client;
    this.directory = directory;
    if (loadAll) this.loadAll();
    client.managers.buttons = this;
  }

  /**
   * Load all buttons in collection
   * @returns {Promise<Collection<string[], Button>>}
   */
  public async loadAll(): Promise<Collection<string[], Button> | undefined> {
    const buttons = await loadFiles<string[], Button>(this.client, this.directory, 'customId');
    this.client.collections.buttons = buttons;
    this.buttons = buttons;
    return buttons;
  }
}
