import { join } from "path";
import { readDirAndPush } from "../util/readDirFiles";
import type { ShewenyClient } from "../index";

export class ButtonsHandler {
  private client: ShewenyClient;
  private dir: string;

  constructor(client: ShewenyClient, dir: string) {
    if (!dir) throw new TypeError("Directory must be provided.");
    this.client = client;
    this.dir = dir;
  }

  async registerAll() {
    const baseDir = join(require.main!.path, this.dir);
    const buttonsPaths: string[] = await readDirAndPush(baseDir);
    for (const buttonPath of buttonsPaths) {
      const Button = (await import(buttonPath)).default;
      if (!Button) continue;
      const instance = new Button(this.client);
      if (!instance.name) continue;
      instance.path = buttonPath;
      this.client.buttons.set(instance.name, instance);
    }
    return this.client.buttons;
  }
}
