import { resolve } from 'path';
import { readDirAndPush } from './readDirFiles';
import { Collection } from 'discord.js';
import { ShewenyError, ShewenyWarning } from '../errors';

import type { ShewenyClient } from '../client/Client';
import type { LoadFilesOptions } from '../typescript/interfaces';
export async function loadFiles<K, V>(client: ShewenyClient, options: LoadFilesOptions): Promise<Collection<K, V> | undefined> {
  try {
    const collection = new Collection<K, V>();
    const filesPath: string[] = await readDirAndPush(resolve(require.main!.path, options.directory));
    let ClassImport: any;
    for (const filePath of filesPath) {
      const file = await import(filePath);

      if (Object.keys(file).length) ClassImport = file[Object.keys(file)[0]];
      // Import the first element
      else ClassImport = file;

      if (!ClassImport) {
        new ShewenyWarning(client, `Cannot find a class to load at file :\n${filePath}`);
        continue;
      }

      // Test if class is a valid class
      if (!ClassImport.constructor) {
        // TODO: Add a warning
        continue;
      }

      const instance = new ClassImport(client);

      if (!instance[options.key]) {
        new ShewenyWarning(
          client,
          `The class ${instance.constructor.name} not have property ${options.key} in super() method. Unable to load it.\nPath : ${filePath}`
        );
        continue;
      }

      instance.path = filePath;
      instance.manager = options.manager;
      collection.set(instance[options.key], instance);
    }

    return collection;
  } catch (err: any) {
    new ShewenyError(client, err.message);
  }
}
