import type { EmojiIdentifierResolvable } from "discord.js";
import type { ShewenyClient } from "../index";

export class Button {
  public client;
  public path?: string;
  public customId: string[];

  constructor(client: ShewenyClient, customId: string[]) {
    this.client = client;
    this.customId = customId;
  }

  unregister() {
    this.client.buttons?.delete(this.customId);
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
    const Button = (await import(this.path!)).default;
    const btn = new Button(this.client);
    return this.client.buttons?.set(btn.customId, btn);
  }
}
