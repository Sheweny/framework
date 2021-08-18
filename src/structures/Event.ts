import { IEventMeta } from "../typescript/interfaces/Event";
import type { ShewenyClient } from "../index";

export class Event {
  protected client;
  protected path?: string;
  protected name: string;
  protected description: string = "";
  protected once: boolean = false;

  constructor(client: ShewenyClient, name: string, options: IEventMeta) {
    this.client = client;
    this.name = name;
    this.description = options.description;
    this.once = options.once;
  }

  unregister() {
    this.client.events?.delete(this.name);
    delete require.cache[require.resolve(this.path!)];
    return true;
  }

  async reload() {
    if (this.path) {
      this.unregister();
      return this.register();
    }
    return null;
  }
	
  async register() {
    const event = (await import(this.path!)).default;
    const cmd = new event(this.client);
    return this.client.events?.set(cmd.name, cmd);
  }
}
