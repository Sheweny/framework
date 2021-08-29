import { join } from "path";

import { readDirAndPush } from "./readDirFiles";
import { Collection } from "collection-data";

import type { ShewenyClient } from "../client/Client";

export async function loadFiles<K, V>(
  client: ShewenyClient,
  directory: string
): Promise<Collection<K, V>> {
  const collection = new Collection<K, V>();
  const baseDir = join(require.main!.path, directory);
  const filesPath: string[] = await readDirAndPush(baseDir);

  for (const buttonPath of filesPath) {
    const fileImport = await import(buttonPath);
    const key = Object.keys(fileImport)[0];
    const Button = fileImport[key];
    if (!Button) continue;
    const instance = new Button(client);
    if (!instance.customId) continue;
    instance.path = buttonPath;
    collection.set(instance.customId, instance);
  }

  return collection;
}
