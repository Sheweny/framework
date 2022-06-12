import { Loader } from '../utils/Loader.js';
import { ShewenyInformation } from '../helpers/index.js';
import { BaseManager } from './index.js';
import { Button } from '../structures/index.js';
import { Collection } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { ButtonsManagerDefaultOptions, ButtonsManagerOptions, CustomId } from '../typescript/index.js';
/**
 * Manager for Buttons
 */
export class ButtonsManager extends BaseManager {
  /**
   * Collection of the buttons
   * @type {Collection<CustomId, Button[]> | undefined}
   */
  public buttons?: Collection<CustomId, Button[]>;

  /**
   * Default data for the buttons
   * @type {ButtonsManagerDefaultOptions}
   */
  public default?: ButtonsManagerDefaultOptions;

  /**
   * Constructor of buttons manager
   * @param {ShewenyClient} client Client framework
   * @param {ButtonsManagerOptions} options The options of the manager
   */
  constructor(client: ShewenyClient, options: ButtonsManagerOptions) {
    super(client, options);
    this.default = {
      cooldown: options.default?.cooldown || 0,
    };
  }

  /**
   * Load all buttons in collection
   * @returns {Promise<Collection<CustomId, Button[]> | undefined> }
   */
  public async loadAll(): Promise<Collection<CustomId, Button[]> | undefined> {
    const loader = new Loader<'customId', CustomId, Button>(this.client, this.directory, 'customId', {
      manager: this,
      instance: Button,
    });
    this.buttons = await loader.load();
    new ShewenyInformation(this.client, `- Buttons loaded : ${this.buttons.size}`);
    return this.buttons;
  }

  /**
   * Unload all buttons
   * @returns {void}
   */
  public unloadAll(): void {
    this.buttons = new Collection();
    this.client.collections.buttons.clear();
  }
}
