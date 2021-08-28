import { Collection } from "collection-data";
import { join } from "path";
import { readDirAndPush } from "../utils/readDirFiles";
import type { ShewenyClient, Button } from "..";

/**
 * Manager for Buttons
 */
export class ButtonsManager {
  /**
   * Client framework
   * @type {ShewenyClient}
   */
  private client: ShewenyClient;

  /**
   * Directory of the buttons folder
   * @type {string}
   */
  public directory: string;

  /**
   * Collection of the buttons
   * @type {Collection<string[], Button> | undefined}
   */
  public buttons?: Collection<string[], Button>;

  /**
   * Constructor to manage buttons
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the buttons folder
   * @param {boolean} [loadAll] If the buttons are loaded during bot launch
   */
  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;
    if (loadAll) this.loadAll();
    client.handlers.buttons = this;
  }

  /**
   * Load all buttons in collection
   * @returns {Promise<Collection<string[], Button>>}
   */
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

    this.client.collections.buttons = buttons;
    this.buttons = buttons;
    return buttons;
  }
}
