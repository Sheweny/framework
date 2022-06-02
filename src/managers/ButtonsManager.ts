import { Collection } from 'discord.js';
import { BaseManager } from '.';
import { Loader } from '../utils/Loader';
import { ShewenyInformation } from '../helpers';
import type { ShewenyClient, Button } from '..';
import type { ButtonsManagerDefaultOptions, ButtonsManagerOptions } from '../typescript/interfaces';
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
   * @param {ButtonsManagerOptions} options The options of the manager
   */
  constructor(client: ShewenyClient, options: ButtonsManagerOptions) {
    super(client, options);
    this.default = {
      cooldown: options.default?.cooldown || 0,
    };
    if (options?.loadAll) this.loadAll();
  }

  /**
   * Load all buttons in collection
   * @returns {Promise<Collection<string[], Button>>}
   */
  public async loadAll(): Promise<Collection<string[], Button> | undefined> {
    const loader = new Loader<string[], Button>(this.client, this.directory, "customId");
    this.buttons = await loader.load();
    //TODO: Refactor for new system
    this.client.collections.buttons = this.buttons;
    new ShewenyInformation(this.client, `- Buttons loaded : ${this.buttons.size}`);
    return this.buttons;

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
