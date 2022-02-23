import { Collection } from 'discord.js';
import { BaseStructure } from '.';
import type { InhibitorsManager } from '..';
import type { ShewenyClient } from '../client/Client';
import type { InhibitorType } from '../typescript/types';
import type { Interaction, Message } from 'discord.js';

interface InhibitorOptions {
  type?: InhibitorType[];
  priority?: number;
}

/**
 * Represents an Command structure
 * @extends {BaseStructure}
 */
export abstract class Inhibitor extends BaseStructure {
  /**
   * The
   * @type {InhibitorsManager}
   */
  public manager?: InhibitorsManager;

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
    const defaultData = client.managers.inhibitors?.default!;

    this.manager = this.client.managers.inhibitors;
    this.name = name;
    this.priority = options?.priority || defaultData.priority!;
    this.type = options?.type || defaultData.type!;
  }

  /**
   * Main function `execute` for the inhibitors
   * @param {any[]} args Button interaction
   * @returns {any | Promise<any>}
   */
  abstract execute(client: ShewenyClient, ctx: Interaction | Message): any | Promise<any>;

  /**
   * This function is executed when the main `execute` function has failed
   * @param {any[]} args Arguments
   * @returns {any | Promise<any>}
   */
  abstract onFailure(client: ShewenyClient, ctx: Interaction | Message): any | Promise<any>;

  /**
   * Register a inhibitor in collections
   * @returns {Collection<string[], Inhibitor>} The inhibitors collection
   */
  public async register(): Promise<Collection<string, Inhibitor>> {
    const InhibitorImported = (await import(this.path!)).default;
    const inhib: Inhibitor = new InhibitorImported(this.client);
    return this.client.collections.inhibitors
      ? this.client.collections.inhibitors.set(inhib.name, inhib)
      : new Collection<string, Inhibitor>().set(inhib.name, inhib);
  }

  /**
   * Reload a inhibitor
   * @returns {Promise<Collection<string[], Inhibitor> | null>} The inhibitors collection
   */
  public async reload(): Promise<Collection<string, Inhibitor> | null> {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }
  /**
   * Unregister a inhibitor from collections
   * @returns {boolean}
   */
  public unregister(): boolean {
    this.client.collections.inhibitors?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }
}
