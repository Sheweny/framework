import { Collection } from "collection-data";
import type { ShewenyClient } from "..";

/**
 * Represent a button
 * @class
 */
export abstract class Button {
  public client;
  public path?: string;
  public customId: string[];

  /**
   * @param {ShewenyClient} client - The client
   * @param {string[]} customId - The different buttons customid
   */
  constructor(client: ShewenyClient, customId: string[]) {
    this.client = client;
    this.customId = customId;
  }

  /**
   * Unregister a button
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.buttons?.delete(this.customId);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a button
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
