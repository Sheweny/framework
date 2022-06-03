import { Collection } from 'discord.js';
import { BaseStructure, ShewenyError, type ShewenyClient, SelectMenusManager } from '../index';
import type { SelectMenuInteraction } from 'discord.js';
import type {Awaitable, SelectMenuOptions, CustomId } from '../typescript';

/**
 * Represents an Select Menu structure
 * @extends {BaseStructure}
 */
export abstract class SelectMenu extends BaseStructure {
  /**
   * Cooldown of a button in seconds
   * @type {number}
   */
  public cooldown: number;
  /**
   * Custom id for one or more select menus
   * @type {string[] | RegExp[]}
   */
  public customId: CustomId;

  /**
   * The
   * @type {SelectMenusManager}
   */
  public manager?: SelectMenusManager;

  /**
   * Constructor for build a Select Menu
   * @param {ShewenyClient} client Client framework
   * @param {string[] | RegExp[]} customId Custom id for one or more select menus
   */
  constructor(client: ShewenyClient, customId: CustomId, options?: SelectMenuOptions) {
    super(client);
    this.cooldown = (options?.cooldown || client.managers.buttons?.default?.cooldown) ?? 0;
    this.customId = customId;
    this.manager = this.client.managers.selectMenus;
  }

  /**
   * This function is executed before executing the `execute` function
   * @param {SelectMenuInteraction} interaction Select Menu interaction
   * @returns {any | Promise<any>}
   */
  before?(interaction: SelectMenuInteraction): Awaitable<unknown>;

  /**
   * Main function `execute` for the select menus
   * @param {SelectMenuInteraction} interaction Select Menus interaction
   * @returns {any | Promise<any>}
   */
  abstract execute(interaction: SelectMenuInteraction): Awaitable<unknown>;

  /**
   * Register a select menu in collections
   * @returns {Collection<string[]| RegExp[], SelectMenu | ShewenyError>} The select menus collection
   */
  public async register(): Promise<Collection<CustomId, SelectMenu> | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'SelectMenu', this.customId.toString());
    const SelectMenuImported = (await import(this.path)).default;
    const sm: SelectMenu = new SelectMenuImported(this.client);
    return this.client.collections.selectMenus
      ? this.client.collections.selectMenus.set(sm.customId, sm)
      : new Collection<CustomId, SelectMenu>().set(sm.customId, sm);
  }

  /**
   * Reload a select menu
   * @returns {Promise<Collection<string[]| RegExp[], SelectMenu> | ShewenyError>} The select menus collection
   */
  public async reload(): Promise<Collection<CustomId, SelectMenu> | ShewenyError> {
    this.unregister();
    return this.register();
  }

  /**
   * Unregister a select menu from collections
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.selectMenus?.delete(this.customId);
    if (!this.path) return false;
    delete require.cache[require.resolve(this.path)];
    return true;
  }
}
