import { IButtonMeta } from "../typescript/interfaces/Button";
import type { EmojiIdentifierResolvable } from "discord.js";
import type { ShewenyClient } from "../index";

export class Button {
  public client;
  public path?: string;
  public customId: string[];
  public description?: string;
  public style: "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER" | "LINK";
  public disabled?: boolean;
  public emoji?: EmojiIdentifierResolvable;
  public label?: string;

  constructor(client: ShewenyClient, customId: string[], options: IButtonMeta) {
    this.client = client;
    this.customId = customId;
    this.description = options.description;
    this.style = options.style;
    this.disabled = options.disabled;
    this.emoji = options.emoji;
    this.label = options.label;
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
