import { Collection } from "collection-data";
import { ButtonInteraction } from "discord.js";
import { ShewenyClient } from "../ShewenyClient";

/**
 * Represent a button
 * @class Button structure
 * @abstract
 */
export abstract class Button {
  public client: ShewenyClient;
  public path?: string;
  public customId: string[];

  /**
   * @constructor
   * @param {ShewenyClient} client - The client
   * @param {string[]} customId - The different buttons customid
   */
  constructor(client: ShewenyClient, customId: string[]) {
    this.client = client;
    this.customId = customId;
  }

  before?(interaction: ButtonInteraction): any | Promise<any>;

  abstract execute(interaction: ButtonInteraction): any | Promise<any>;

  /**
   * Unregister a button
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.buttons?.delete(this.customId);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a button
   * @public
   * @async
   * @returns {Promise<Collection<string[], Button> | null>} The buttons collection
   */
  public async reload(): Promise<Collection<string[], Button> | null> {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }

  /**
   * Register a button
   * @public
   * @async
   * @returns {Collection<string[], Button>} The buttons collection
   */
  public async register(): Promise<Collection<string[], Button>> {
    const Button = (await import(this.path!)).default;
    const btn = new Button(this.client);
    return this.client.buttons
      ? this.client.buttons.set(btn.customId, btn)
      : new Collection<string[], Button>().set(btn.customId, btn);
  }
}
