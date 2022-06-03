import { Collection } from 'discord.js';
import { BaseStructure, ShewenyError, type ShewenyClient, type ButtonsManager } from '../index';
import type { ButtonInteraction } from 'discord.js';
import type { Awaitable, ButtonOptions, CustomId } from '../typescript';

/**
 * Represents an Button structure
 * @extends {BaseStructure}
 */
export abstract class Button extends BaseStructure {
  /**
   * Cooldown of a button in seconds
   * @type {number}
   */
  public cooldown: number;
  /**
   * Custom id for one or more buttons
   * @type {string[] | RegExp[]}
   */
  public customId: CustomId;

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
  constructor(client: ShewenyClient, customId: CustomId, options?: ButtonOptions) {
    super(client);
    this.cooldown = (options?.cooldown || client.managers.buttons?.default?.cooldown) ?? 0;
    this.customId = customId;
    this.manager = this.client.managers.buttons;
  }

  /**
   * This function is executed before executing the `execute` function
   * @param {ButtonInteraction} interaction Button interaction
   * @returns {any | Promise<any>}
   */
  before?(interaction: ButtonInteraction): Awaitable<unknown>;

  /**
   * Main function `execute` for the buttons
   * @param {ButtonInteraction} interaction Button interaction
   * @returns {any | Promise<any>}
   */
  abstract execute(interaction: ButtonInteraction): Awaitable<unknown>;

  /**
   * Register a button in collections
   * @returns {Collection<string[] | RegExp[], Button>}
   */
  public async register(): Promise<Collection<CustomId, Button> | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Button', this.customId.toString());
    const ButtonImported = (await import(this.path)).default;
    const btn = new ButtonImported(this.client);
    return this.client.collections.buttons
      ? this.client.collections.buttons.set(btn.customId, btn)
      : new Collection<string[] | RegExp[], Button>().set(btn.customId, btn);
  }

  /**
   * Reload a button
   * @returns {Promise<Collection<string[] | RegExp[], Button> | ShewenyError>}
   */
  public async reload(): Promise<Collection<Array<string | RegExp>, Button> | ShewenyError> {
    this.unregister();
    return this.register();
  }

  /**
   * Unregister a button from collections
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.buttons?.delete(this.customId);
    if (!this.path) return false;
    delete require.cache[require.resolve(this.path)];
    return true;
  }
}
