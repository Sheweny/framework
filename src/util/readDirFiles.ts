import { stat, readdir } from "fs/promises";
import { join } from "path";

/**
 * Read dir and return array with all paths of files
 * @param {string} directory - The directory to read
 * @returns {Array<string>}
 */
export async function readDirAndPush(d: string): Promise<Array<string>> {
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
