import { Collection } from "collection-data";
import type { ShewenyClient } from "..";

/**
 * Represent a select menu
 * @class
 */
export class SelectMenu {
  public client;
  public path?: string;
  public customId: string[];

  /**
   * @param {ShewenyClient} client - The client
   * @param {string[]} customId - The different select menu customid
   */
  constructor(client: ShewenyClient, customId: string[]) {
    this.client = client;
    this.customId = customId;
  }

  /**
   * Unregister a select menu
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.selectMenus?.delete(this.customId);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a select menu
   * @returns {Promise<Collection<string[], SelectMenu> | null>} The select menus collection
   */
  public async reload(): Promise<Collection<string[], SelectMenu> | null> {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }

  /**
   * Register a select menu
   * @returns {Collection<string[], SelectMenu>} The select menus collection
   */
  public async register(): Promise<Collection<string[], SelectMenu>> {
    const SelectMenu = (await import(this.path!)).default;
    const sm = new SelectMenu(this.client);
    return this.client.selectMenus?.set(sm.customId, sm);
  }
}
