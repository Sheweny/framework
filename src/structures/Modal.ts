import { BaseStructure } from './BaseStructure.js';
import { ShewenyError } from '../helpers/index.js';
import type { ShewenyClient } from '../client/Client.js';
import type { ModalSubmitInteraction } from 'discord.js';
import type { Awaitable, ModalData, CustomId } from '../typescript/index.js';

/**
 * Represents an Modal structure
 * @extends {BaseStructure}
 */
export abstract class Modal extends BaseStructure {
  /**
   * Cooldown of a button in seconds
   * @type {number}
   */
  public cooldown: number;
  /**
   * Custom id for one or more modals
   * @type {CustomId}
   */
  public customId: CustomId;

  /**
   * Constructor to build a Modal
   * @param {ShewenyClient} [client] Client framework
   * @param {CustomId} [customId] Custom id for one or more modals
   * @param {ModalData | undefined} [options] The options of the modal
   */
  constructor(client: ShewenyClient, customId: CustomId, options?: ModalData) {
    super(client, options?.enabled);
    this.cooldown = (options?.cooldown || client.managers.buttons?.default?.cooldown) ?? 0;
    this.customId = customId;
  }

  /**
   * This function is executed before executing the `execute` function
   * @param {ModalSubmitInteraction} interaction Modal interaction
   * @returns {any | Promise<any>}
   */
  before?(interaction: ModalSubmitInteraction): Awaitable<unknown>;

  /**
   * Main function `execute` for the modals
   * @param {ModalSubmitInteraction} interaction Modal interaction
   * @returns {any | Promise<any>}
   */
  abstract execute(interaction: ModalSubmitInteraction): Awaitable<unknown>;

  /**
   * Register a modal in collections
   * @returns {Promise<Modal | ShewenyError>}
   */
  public async register(): Promise<Modal | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Modal', this.customId.toString());
    const ModalImported = (await import(this.path)).default;
    const mod = new ModalImported(this.client);
    return mod;
  }

  /**
   * Reload a modal
   * @returns {Promise<Modal> | ShewenyError>}
   */
  public async reload(): Promise<Modal | ShewenyError> {
    this.unregister();
    return this.register();
  }

  /**
   * Unregister a modal from collections
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.modals?.delete(this.customId);
    if (!this.path) return false;
    delete require.cache[require.resolve(this.path)];
    return true;
  }
}
