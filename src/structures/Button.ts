import { BaseStructure } from './BaseStructure.js';
import { ShewenyError } from '../helpers/index.js';
import type { ShewenyClient } from '../client/Client.js';
import type { ButtonInteraction } from 'discord.js';
import type { Awaitable, ButtonData, CustomId } from '../typescript/index.js';

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
   * @type {CustomId}
   */
  public customId: CustomId;

  /**
   * Constructor for build a Button
   * @param {ShewenyClient} [client] Client framework
   * @param {CustomId} [customId] Custom id for one or more buttons
   * @param {ButtonData | undefined} [options] The options of the button
   */
  constructor(client: ShewenyClient, customId: CustomId, options?: ButtonData) {
    super(client);
    this.cooldown = (options?.cooldown || client.managers.buttons?.default?.cooldown) ?? 0;
    this.customId = customId;
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
   * @returns {Collection<CustomId, Button>}
   */
  public async register(): Promise<Button | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Button', this.customId.toString());
    const ButtonImported = (await import(this.path)).default;
    const btn = new ButtonImported(this.client);
    return btn;
  }

  /**
   * Reload a button
   * @returns {Promise<Collection<CustomId, Button> | ShewenyError>}
   */
  public async reload(): Promise<Button | ShewenyError> {
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
