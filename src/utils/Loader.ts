import { resolve } from 'path';
import { Collection } from 'discord.js';
import { ShewenyError, ShewenyWarning } from '../helpers';

import type { ShewenyClient } from '../client/Client';
// import type { Constructable } from '../typescript/utilityTypes';

import { readdir, stat } from 'fs/promises';
import type { BaseStructure } from '../structures';

// Version 2.0.0
// type property = string; // | number | symbol;
/* type WithProperty<K extends property, V = {}> = {
  [P in K] : V
}*/

type WithMainProperty<K extends string, V> = {
  [P in K]: V;
};
type StructureConstructed<MKN extends string, MKV, V> = V &  WithMainProperty<MKN, MKV>;
type StructureConstructable<MKN extends string, MKV, S> = new (client: ShewenyClient) => S & WithMainProperty<MKN, MKV>;
type StructureType<MKN extends string, MKV> = BaseStructure & WithMainProperty<MKN, MKV>

export class Loader<MKN extends string, MKV, V extends StructureType<MKN, MKV>> {
  public client: ShewenyClient;
  public collection: Collection<MKV, V>;
  public mainKey: MKN;
  public mainPath: string;
  public paths: Array<string>;

  constructor(client: ShewenyClient, path: string, mainKey: MKN) {
    this.client = client;
    this.collection = new Collection<MKV, V>();
    this.mainPath = this.absolutePath(path);
    this.paths = [];
    this.mainKey = mainKey;
  }

  // Return the number of loaded paths
  public async load(dir: string = this.mainPath) {
    if (dir) await this.readDirectory(this.absolutePath(dir));
    else if (this.mainPath) await this.readDirectory(this.mainPath);
    else new ShewenyError(this.client, 'MISSING_PATH_LOADER');
    if (!this.paths.length) return this.collection;
    for (const path of this.paths) {
      await this.loadFileStructures(path);
    }
    return this.collection;
  }

  private absolutePath(dir: string) {
    let main = '';
    if (!require.main) main = process.cwd();
    else main = require.main.path;
    return resolve(main, dir);
  }

  private async readDirectory(dir: string) {
    const result = await readdir(dir);
    for (const item of result) {
      const resolvedPath: string = resolve(dir, item);
      const infos = await stat(resolvedPath);
      if (infos.isDirectory()) await this.readDirectory(resolvedPath);
      else this.paths.push(resolvedPath);
    }
  }

  private async loadFileStructures(path: string) {
    try {
      const imported = await import(path);
      const keys = Object.keys(imported);
      if (keys.length) {
        for (const key of keys) {
          await this.loadStructure(imported[key], path);
        }
      } else {
        await this.loadStructure(imported, path);
      }
    } catch (err) {
      const error = err as Error;
      // TODO: Handle this error
      new ShewenyError(this.client, error);
    }
  }
  private async loadStructure(Structure: StructureConstructable<MKN, MKV, V>, path: string) {
    try {
      const instance: StructureConstructed<MKN, MKV, V> = new Structure(this.client);
      if (!instance) return;
      if (!Object.hasOwn(instance, this.mainKey)) {
        return new ShewenyWarning(this.client, 'MISSING_PROPERTY_CLASS', this.mainKey, path);
      }
      if (this.collection.get(instance[this.mainKey])) {
        return new ShewenyWarning(this.client, 'DUPLICATE_CLASS', path);
      }
      instance.path = path;
      this.collection.set(instance[this.mainKey], instance);
    } catch (err) {
      const error = err as Error;
      // TODO: Implement this error
      new ShewenyWarning(this.client, 'INVALID_CLASS', Structure.toString(), path, error);
    }
  }
}
