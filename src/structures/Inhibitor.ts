import { BaseStructure } from './index.js';
import { ShewenyError } from '../helpers/index.js';
import type { ShewenyClient } from '../client/Client.js';
import type { Interaction, Message } from 'discord.js';
import type { Awaitable, InhibitorType, InhibitorOptions } from '../typescript/index.js';

/**
 * Represents an Command structure
 * @extends {BaseStructure}
 */
export abstract class Inhibitor extends BaseStructure {
  /**
   * Name of a inhibitor
   * @type {string}
   */
  public name: string;

  /**
   * Priority of a inhibitor
   * @type {number}
   */
  public priority: number;

  /**
   * Type(s) of a inhibitor
   * @type {InhibitorType[]}
   */
  public type: InhibitorType[];

  /**
   * Constructor for build a Inhibitor
   * @param {ShewenyClient} client Client framework
   * @param {string} name Name of the event
   * @param {InhibitorOptions} [options] Options for the inhibitor
   */
  constructor(client: ShewenyClient, name: string, options?: InhibitorOptions) {
    super(client);
    const defaultData = client.managers.inhibitors?.default || {};

    this.name = name;
    this.priority = (options?.priority || defaultData.priority) ?? 0;
    this.type = (options?.type || defaultData.type) ?? [];
  }

  /**
   * Main function `execute` for the inhibitors
   * @param {any[]} args Button interaction
   * @returns: Awaitable<unknown>}
   */
  abstract execute(client: ShewenyClient, ctx: Interaction | Message): Awaitable<unknown>;

  /**
   * This function is executed when the main `execute` function has failed
   * @param {any[]} args Arguments
   * @returns: Awaitable<unknown>}
   */
  abstract onFailure(client: ShewenyClient, ctx: Interaction | Message): Awaitable<unknown>;

  /**
   * Register an inhibitor
   * @returns {Promise<Inhibitor | ShewenyError>} The loaded inhibitor
   */
  public async register(): Promise<Inhibitor | ShewenyError> {
    if (!this.path) return new ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Inhibitor', this.name);
    const InhibitorImported = (await import(this.path)).default;
    const inhib: Inhibitor = new InhibitorImported(this.client);
    return inhib;
  }

  /**
   * Reload the inhibitor
   * @returns {Promise<Inhibitor | ShewenyError>} The loaded inhibitor
   */
  public async reload(): Promise<Inhibitor | ShewenyError> {
    this.unregister();
    return this.register();
  }
  /**
   * Unregister the inhibitor from cache
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.inhibitors?.delete(this.name);
    if (!this.path) return false;
    delete require.cache[require.resolve(this.path)];
    return true;
  }
}
