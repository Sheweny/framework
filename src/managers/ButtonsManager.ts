import { Collection } from "discord.js";
import { join } from "path";
import type { ShewenyClient } from "../client/Client";
import type { Button } from "../structures/Button";
import { readDirAndPush } from "../utils/readDirFiles";

export class ButtonsManager {
  private client: ShewenyClient;
  public directory: string;
  public buttons?: Collection<string[], Button>;

  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;
    if (loadAll) this.loadAll();
    client.handlers.manager.interactions.buttons = this;
  }

  public async loadAll(): Promise<Collection<string[], Button>> {
    const buttons = new Collection<string[], Button>();
    const baseDir = join(require.main!.path, this.directory);
    const buttonsPaths: string[] = await readDirAndPush(baseDir);

    for (const buttonPath of buttonsPaths) {
      const buttonImport = await import(buttonPath);
      const key = Object.keys(buttonImport)[0];
      const Button = buttonImport[key];
      if (!Button) continue;
      const instance = new Button(this.client);
      if (!instance.customId) continue;
      instance.path = buttonPath;
      buttons.set(instance.customId, instance);
    }

    this.client.handlers.collections.interactions.buttons = buttons;
    this.buttons = buttons;
    return buttons;
  }
}
