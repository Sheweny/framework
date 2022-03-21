import { Collection } from 'discord.js';
import { loadFiles } from '../utils/loadFiles';
import { BaseManager } from '.';
import { ShewenyInformation } from '../helpers';
import type { ShewenyClient, Button } from '..';
import type { BaseManagerOptions, ButtonsManagerDefaultOptions, ButtonsManagerOptions } from '../typescript/interfaces';
/**
 * Manager for Buttons
 */
export class ButtonsManager extends BaseManager {
  /**
   * Collection of the buttons
   * @type {Collection<string[], Button> | undefined}
   */
  public buttons?: Collection<string[], Button> | null;

  /**
   * Default data for the buttons
   * @type {Collection<string[], Button> | undefined}
   */
  public default?: ButtonsManagerDefaultOptions;

  /**
   * Constructor to manage buttons
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the buttons folder
   * @param {boolean} [loadAll] If the buttons are loaded during bot launch
   */
  constructor(client: ShewenyClient, options: ButtonsManagerOptions) {
    super(client, options);
    this.default = {
      cooldown: options.cooldown || 0,
    };
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
    new ShewenyInformation(this.client, `- Buttons loaded : ${this.client.collections.buttons.size}`);
    return buttons;
  }

  /**
   * Unload all buttons
   * @returns {void}
   */
  public unloadAll(): void {
    this.buttons = null;
    this.client.collections.buttons.clear();
  }
}
