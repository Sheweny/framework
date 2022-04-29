import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import { ShewenyError } from '../helpers';
import type { ModalSubmitInteraction } from 'discord.js';
import type { ModalsManager } from '..';
import type { ShewenyClient } from '../client/Client';
import type { Awaitable } from '../typescript/utilityTypes';
import { ModalOptions } from '../typescript/interfaces';

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
   * @type {string[] | RegExp[]}
   */
  public customId: string[] | RegExp[];

  /**
   * The
   * @type {ModalsManager}
   */
  public manager?: ModalsManager;

  /**
   * Constructor to build a Modal
   * @param {ShewenyClient} client Client framework
   * @param {string[] | RegExp[]} customId Custom id for one or more modals
   */
  constructor(client: ShewenyClient, customId: string[] | RegExp[], options: ModalOptions) {
    super(client);
    this.cooldown = (options?.cooldown || client.managers.buttons?.default?.cooldown) ?? 0;
    this.customId = customId;
    this.manager = this.client.managers.modals;
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
   * @returns {Collection<string[] | RegExp[], Modal>}
   */
  public async register(): Promise<Collection<string[] | RegExp[], Modal> | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Modal', this.customId.toString());
    const ModalImported = (await import(this.path)).default;
    const mod = new ModalImported(this.client);
    return this.client.collections.modals
      ? this.client.collections.modals.set(mod.customId, mod)
      : new Collection<string[] | RegExp[], Modal>().set(mod.customId, mod);
  }

  /**
   * Reload a modal
   * @returns {Promise<Collection<string[] | RegExp[], Modal> | ShewenyError>}
   */
  public async reload(): Promise<Collection<string[] | RegExp[], Modal> | ShewenyError> {
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
