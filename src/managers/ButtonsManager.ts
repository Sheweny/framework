import { Collection } from 'discord.js';
import { loadFiles } from '../utils/loadFiles';
import { BaseManager } from '.';
import type { ShewenyClient, Button } from '..';
import type { BaseManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Buttons
 */
export class ButtonsManager extends BaseManager {
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
  constructor(client: ShewenyClient, options: BaseManagerOptions) {
    super(client, options);

    if (options?.loadAll) this.loadAll();
    client.managers.buttons = this;
  }

  /**
   * Load all buttons in collection
   * @returns {Promise<Collection<string[], Button>>}
   */
  public async loadAll(): Promise<Collection<string[], Button> | undefined> {
    const buttons = await loadFiles<string[], Button>(this.client, {
      directory: this.directory,
      key: 'customId',
    });
    if (buttons) this.client.collections.buttons = buttons;
    this.buttons = buttons;
    return buttons;
  }
}
