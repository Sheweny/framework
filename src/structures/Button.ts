import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import type { ButtonInteraction } from 'discord.js';
import type { ButtonsManager } from '..';
import type { ShewenyClient } from '../client/Client';

/**
 * Represents an Button structure
 * @extends {BaseStructure}
 */
export abstract class Button extends BaseStructure {
  /**
   * Custom id for one or more buttons
   * @type {string[] | RegExp[]}
   */
  public customId: string[] | RegExp[];

  /**
   * The
   * @type {ButtonsManager}
   */
  public manager?: ButtonsManager;

  /**
   * Constructor for build a Button
   * @param {ShewenyClient} client Client framework
   * @param {string[] | RegExp[]} customId Custom id for one or more buttons
   */
  constructor(client: ShewenyClient, customId: string[] | RegExp[]) {
    super(client);
    this.customId = customId;

    this.manager = this.client.managers.buttons;
  }

  /**
   * This function is executed before executing the `execute` function
   * @param {ButtonInteraction} interaction Button interaction
   * @returns {any | Promise<any>}
   */
  before?(interaction: ButtonInteraction): any | Promise<any>;

  /**
   * Main function `execute` for the buttons
   * @param {ButtonInteraction} interaction Button interaction
   * @returns {any | Promise<any>}
   */
  abstract execute(interaction: ButtonInteraction): any | Promise<any>;

  /**
   * Unregister a button from collections
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.buttons?.delete(this.customId);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a button
   * @returns {Promise<Collection<string[] | RegExp[], Button> | null>}
   */
  public async reload(): Promise<Collection<string[] | RegExp[], Button> | null> {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }

  /**
   * Register a button in collections
   * @returns {Collection<string[] | RegExp[], Button>}
   */
  public async register(): Promise<Collection<string[] | RegExp[], Button>> {
    const Button = (await import(this.path!)).default;
    const btn = new Button(this.client);
    return this.client.collections.buttons
      ? this.client.collections.buttons.set(btn.customId, btn)
      : new Collection<string[] | RegExp[], Button>().set(btn.customId, btn);
  }
}
