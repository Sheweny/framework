import type { ShewenyClient } from "../index";

interface IEventMeta {
  name: string;
  description: string;
  once: boolean;
}

/**
 * Represent a event
 * @class
 */
export class Event {
  protected client;
  protected path?: string;
  protected name: string;
  protected description: string = "";
  protected once: boolean = false;

  /**
   * @param {ShewenyClient} client - The client
   * @param {string} name - The name of the event
   * @param {Object} options - The options of the event
   */
  constructor(client: ShewenyClient, name: string, options: IEventMeta) {
    this.client = client;
    this.name = name;
    this.description = options.description;
    this.once = options.once;
  }
  /**
   * Unregister a event
   * @returns {boolean}
   */
  unregister() {
    this.client.events?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }
  /**
   * Reload a event
   * @returns {boolean|null}
   */
  async reload() {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }
  /**
   * Register a event
   * @returns {Collection} The events collection
   */
  async register() {
    const event = (await import(this.path!)).default;
    const cmd = new event(this.client);
    return this.client.events?.set(cmd.name, cmd);
  }
}
