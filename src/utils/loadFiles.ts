import { resolve } from 'path';
import { readDirAndPush } from './readDirFiles';
import { Collection } from 'discord.js';
import { ShewenyError, ShewenyWarning } from '../helpers';

import type { ShewenyClient } from '../client/Client';
import type { LoadFilesOptions } from '../typescript/interfaces';
import type { Constructable } from '../typescript/utilityTypes';
export async function loadFiles<K, V>(client: ShewenyClient, options: LoadFilesOptions): Promise<Collection<K, V> | undefined> {
  try {
    const collection = new Collection<K, V>();
    //  eslint-disable-next-line
    const filesPath: string[] = await readDirAndPush(resolve(require.main!.path, options.directory));
    //  eslint-disable-next-line
    let Structure: Constructable<any>;
    for (const filePath of filesPath) {
      const file = await import(filePath);

      //  Import the first element
      if (Object.keys(file).length) Structure = file[Object.keys(file)[0]];
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
        new ShewenyWarning(client, 'INVALID_CLASS', Structure, filePath);
        continue;
      }
    }

    return collection;
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
