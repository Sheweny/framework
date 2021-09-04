import { Collection } from "collection-data";
import { BaseStructure } from ".";
import type { SelectMenuInteraction } from "discord.js";
import type { ShewenyClient } from "../client/Client";

/**
 * Represents an Select Menu structure
 * @extends {BaseStructure}
 */
export abstract class SelectMenu extends BaseStructure {
  /**
   * Custom id for one or more select menus
   * @type {string[]}
   */
  public customId: string[];

  /**
   * Constructor for build a Select Menu
   * @param {ShewenyClient} client Client framework
   * @param {string[]} customId Custom id for one or more select menus
   */
  constructor(client: ShewenyClient, customId: string[]) {
    super(client);

    this.customId = customId;
  }

  /**
   * This function is executed before executing the `execute` function
   * @param {SelectMenuInteraction} interaction Select Menu interaction
   * @returns {any | Promise<any>}
   */
  before?(interaction: SelectMenuInteraction): any | Promise<any>;

  /**
   * Main function `execute` for the select menus
   * @param {SelectMenuInteraction} interaction Select Menus interaction
   * @returns {any | Promise<any>}
   */
  abstract execute(interaction: SelectMenuInteraction): any | Promise<any>;

  /**
   * Unregister a select menu from collections
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.selectMenus?.delete(this.customId);
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
   * Register a select menu in collections
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
