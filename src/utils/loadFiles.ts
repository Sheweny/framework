import { resolve } from 'path';
import { readDirAndPush } from './readDirFiles.js';
import { Collection } from 'discord.js';
import { ShewenyError, ShewenyWarning } from '../helpers/index.js';

import type { ShewenyClient } from '../client/Client.js';
import type { LoadFilesOptions, Constructable } from '../typescript/index.js';
export async function loadFiles<K, V>(
  client: ShewenyClient,
  options: LoadFilesOptions,
): Promise<Collection<K, V> | undefined | ShewenyError> {
  try {
    const collection = new Collection<K, V>();
    //  eslint-disable-next-line
    const filesPath: string[] = await readDirAndPush(resolve(require.main!.path, options.directory));
    //  eslint-disable-next-line
    let Structure: Constructable<any>;
    for (const filePath of filesPath) {
      const file = await import(filePath);

      //  Import the first element
      const keys = Object.keys(file);
      if (keys[0]) Structure = file[keys[0]];
      else Structure = file;
      try {
        const instance = new Structure(client);

        if (!instance[options.key]) {
          new ShewenyWarning(client, 'MISSING_PROPERTY_CLASS', options.key, filePath);
          continue;
        }
        instance.path = filePath;
        if (collection.get(instance[options.key])) new ShewenyWarning(client, 'DUPLICATE_CLASS', instance[options.key], filePath);
        collection.set(instance[options.key], instance);
      } catch (e) {
        new ShewenyWarning(client, 'INVALID_CLASS', Structure.toString(), filePath);
      }
    }
    return collection;
  } catch (err) {
    const e = err as Error;
    return new ShewenyError(client, e);
  }
}
