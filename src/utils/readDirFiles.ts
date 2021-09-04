import { readdir, stat } from "fs/promises";
import { join } from "path";

export async function readDirAndPush(d: string): Promise<string[]> {
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
