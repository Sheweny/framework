import { Collection } from "collection-data";
import type { SelectMenuInteraction } from "discord.js";
import type { ShewenyClient } from "../client/Client";

export abstract class SelectMenu {
  public client: ShewenyClient;
  public path: string = "";
  public customId: string[];

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
    this.client.collections.selectMenus?.delete(this.customId);
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
    return this.client.collections.selectMenus
      ? this.client.collections.selectMenus.set(sm.customId, sm)
      : new Collection<string[], SelectMenu>().set(sm.customId, sm);
  }
}
