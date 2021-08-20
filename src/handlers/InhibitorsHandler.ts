import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import type { ShewenyClient } from "..";
import { Inhibitor } from "../typescript/interfaces/interfaces";

/**
 * Loads buttons.
 * @class
 */
export class ButtonsHandler {
  private client: ShewenyClient | undefined;
  private dir: string;

  /**
   * @param {string} directory - The directory of the buttons
   * @param {ShewenyClient} [client] - The client
   */
  constructor(dir: string, client?: ShewenyClient) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
  }

  /**
   * Register all buttons in collection
   * @returns {Promise<Collection<string[], Event>>} The buttons collection
   */
  public async registerAll(): Promise<Collection<string[], Inhibitor>> {
    const buttons = new Collection<string[], Inhibitor>();
    const baseDir = join(require.main!.path, this.dir);
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

    if (this.client) this.client.inhibitors = buttons;
    return buttons;
  }
}
