import { Collection } from "collection-data";
import { SelectMenuInteraction } from "discord.js";
import type { ShewenyClient } from "../ShewenyClient";

/**
 * Represent a select menu
 * @class SelectMenu structure
 * @abstract
 */
export abstract class SelectMenu {
  public client: ShewenyClient | any;
  public path?: string;
  public customId: string[];

  /**
   * @constructor
   * @param {ShewenyClient} client - The client
   * @param {string[]} customId - The different select menu customid
   */
  constructor(client: ShewenyClient, customId: string[]) {
    this.client = client;
    this.customId = customId;
  }

  before?(interaction: SelectMenuInteraction): any | Promise<any>;

  abstract execute(interaction: SelectMenuInteraction): any | Promise<any>;

  /**
   * Unregister a select menu
   * @public
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.selectMenus?.delete(this.customId);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  /**
   * Reload a select menu
   * @public
   * @async
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
   * @public
   * @async
   * @returns {Collection<string[], SelectMenu>} The select menus collection
   */
  public async register(): Promise<Collection<string[], SelectMenu>> {
    const SelectMenu = (await import(this.path!)).default;
    const sm: SelectMenu = new SelectMenu(this.client);
    return this.client.selectMenus
      ? this.client.selectMenus.set(sm.customId, sm)
      : new Collection<string[], SelectMenu>().set(sm.customId, sm);
  }
}
