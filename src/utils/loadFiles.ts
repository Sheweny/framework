import { resolve } from 'path';
import { readDirAndPush } from './readDirFiles';
import { Collection } from 'discord.js';
import { ShewenyError, ShewenyWarning } from '../errors';

import type { ShewenyClient } from '../client/Client';

export async function loadFiles<K, V>(
  client: ShewenyClient | any,
  directory: string,
  key: string
): Promise<Collection<K, V> | undefined> {
  try {
    const collection = new Collection<K, V>();
    const baseDir = resolve(require.main!.path, directory);
    const filesPath: string[] = await readDirAndPush(baseDir);

    for (const filePath of filesPath) {
      let ClassImport = await import(filePath);
      if (Object.keys(ClassImport).length) {
        const key = Object.keys(ClassImport)[0];
        ClassImport = ClassImport[key];
      }
      if (!ClassImport) {
        new ShewenyWarning(client, `Cannot find a class to load at file :\n${filePath}`);
        continue;
      }

      const instance = new ClassImport(client);

      if (!instance[key]) {
        new ShewenyWarning(
          client,
          `The class ${instance.constructor.name} not have property ${key} in super() method. Unable to load it.\nPath : ${filePath}`
        );
        continue;
      }

      instance.path = filePath;
      collection.set(instance[key], instance);
    }

    return collection;
  } catch (err: any) {
    new ShewenyError(client, err.message);
  }
}
