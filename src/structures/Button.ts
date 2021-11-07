import type { ButtonInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client';
import { Collection } from 'discord.js';
import { BaseStructure } from '.';

/**
 * Represents an Button structure
 * @extends {BaseStructure}
 */
export abstract class Button extends BaseStructure {
  /**
   * Custom id for one or more buttons
   * @type {string[]}
   */
  public customId: string[];

  /**
   * Constructor for build a Button
   * @param {ShewenyClient} client Client framework
   * @param {string[]} customId Custom id for one or more buttons
   */
  constructor(client: ShewenyClient, customId: string[]) {
    super(client);

    this.customId = customId;
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
   * @returns {Promise<Collection<string[], Button> | null>}
   */
  public async reload(): Promise<Collection<string[], Button> | null> {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }

  /**
   * Register a button in collections
   * @returns {Collection<string[], Button>}
   */
  public async register(): Promise<Collection<string[], Button>> {
    const Button = (await import(this.path!)).default;
    const btn = new Button(this.client);
    return this.client.collections.buttons
      ? this.client.collections.buttons.set(btn.customId, btn)
      : new Collection<string[], Button>().set(btn.customId, btn);
  }
}
