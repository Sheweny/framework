import { join } from "path";
import { readDirAndPush } from "../util/readDirFiles";
import type { ShewenyClient } from "../index";
import { Button } from "../structures/Button";
import { Collection } from "collection-data";

/**
 * Loads buttons.
 * @class
 */
export class ButtonsHandler {
  private client: ShewenyClient;
  private dir: string;

  /**
   * @param {ShewenyClient} client - The client
   * @param {string} directory - The directory of the buttons
   */
  constructor(client: ShewenyClient, dir: string) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
  }

  /**
   * Register all buttons in collection
   * @returns {Promise<Collection<string[], Event>>} The buttons collection
   */
  public async registerAll(): Promise<Collection<string[], Button>> {
    const baseDir = join(require.main!.path, this.dir);
    const buttonsPaths: string[] = await readDirAndPush(baseDir);
    for (const buttonPath of buttonsPaths) {
      const Button = (await import(buttonPath)).default;
      if (!Button) continue;
      const instance = new Button(this.client);
      if (!instance.customId) continue;
      instance.path = buttonPath;
      this.client.buttons.set(instance.name, instance);
    }
    return this.client.buttons;
  }
}
