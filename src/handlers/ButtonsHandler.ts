import { join } from "path";
import { Collection } from "collection-data";
import { readDirAndPush } from "../util/readDirFiles";
import { ShewenyClient } from "../ShewenyClient";
import { Button } from "../structures";

/**
 * Loads buttons.
 * @class Buttons Handler
 */
export class ButtonsHandler {
  private client?: ShewenyClient;
  private dir: string;

  /**
   * @constructor
   * @param {string} directory - The directory of the buttons
   * @param {ShewenyClient} [client] - The client
   */
  constructor(dir: string, client?: ShewenyClient, registerAll?: boolean) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
    if (registerAll) this.registerAll();
    if (client && client instanceof ShewenyClient) client.handlers.buttons = this;
  }

  /**
   * Register all buttons in collection
   * @public
   * @async
   * @returns {Promise<Collection<string[], Event>>} The buttons collection
   */
  public async registerAll(): Promise<Collection<string[], Button>> {
    const buttons = new Collection<string[], Button>();
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

    if (this.client instanceof ShewenyClient) this.client.buttons = buttons;
    return buttons;
  }
}
