import { BaseStructure } from './index.js';
import { ShewenyError } from '../helpers/index.js';
import type { ShewenyClient } from '../client/Client.js';
import type { SelectMenuInteraction } from 'discord.js';
import type { Awaitable, SelectMenuData, CustomId } from '../typescript/index.js';

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
   * Constructor for build a Select Menu
   * @param {ShewenyClient} client Client framework
   * @param {string[] | RegExp[]} customId Custom id for one or more select menus
   */
  constructor(client: ShewenyClient, customId: CustomId, options?: SelectMenuData) {
    super(client);
    this.cooldown = (options?.cooldown || client.managers.buttons?.default?.cooldown) ?? 0;
    this.customId = customId;
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
  public async register(): Promise<SelectMenu | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'SelectMenu', this.customId.toString());
    const SelectMenuImported = (await import(this.path)).default;
    const sm: SelectMenu = new SelectMenuImported(this.client);
    return sm;
  }

  /**
   * Reload a select menu
   * @returns {Promise<Collection<string[]| RegExp[], SelectMenu> | ShewenyError>} The select menus collection
   */
  public async reload(): Promise<SelectMenu | ShewenyError> {
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
