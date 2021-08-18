import { readdir, stat } from "fs/promises";
import { join } from "path";
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
    const buttonsPaths: string[] = await this.readDirAndPush(baseDir);
    for (const buttonPath of buttonsPaths) {
      const Button = (await import(buttonPath)).default;
      if (!Button) continue;
      const instance = new Button(this.client);
      if (!instance.name) continue;
      instance.path = buttonPath;
      this.client.buttons.set(instance.name, instance);
    }
    return this.client.events;
  }

  async readDirAndPush(d: string): Promise<Array<string>> {
    const files: string[] = [];
    async function read(dir: string) {
      const result = await readdir(dir);
      for (const item of result) {
        const infos = await stat(join(dir, item));
        if (infos.isDirectory()) await read(join(dir, item));
        else files.push(join(dir, item));
      }
      return;
    }

    await read(d);

    return files;
  }
}
