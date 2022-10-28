import { Collection } from 'discord.js';
import { ShewenyError, ShewenyWarning } from '../helpers/index.js';

import type { ShewenyClient } from '../client/Client.js';

import { readdir, stat } from 'fs/promises';
import { resolve } from 'node:path';
import type { BaseStructure } from '../structures/index.js';
import type { Class, Manager, Structure } from '../typescript/index.js';

// Version 2.0.0
type WithMainProperty<K extends string, V> = { [P in K]: V };
type StructureConstructed<MKN extends string, MKV, V> = V & WithMainProperty<MKN, MKV>;
type StructureConstructable<MKN extends string, MKV, S> = { _id: string } & (new (client: ShewenyClient) => S &
  WithMainProperty<MKN, MKV>);
type StructureType<MKN extends string, MKV> = BaseStructure & WithMainProperty<MKN, MKV>;

interface LoaderOptions {
  instance: Class<Structure>;
  manager: Manager;
  asyncRead?: boolean;
}

export class Loader<MKN extends string, MKV, V extends StructureType<MKN, MKV>> {
  public readonly client: ShewenyClient;
  public readonly collection: Collection<MKV, V[]>;
  public readonly mainKey: MKN;
  public readonly mainPath: string;
  public readonly paths: Array<string>;
  public readonly manager: Manager;
  public readonly asyncRead: boolean;
  public readonly instance: Class<Structure>;

  constructor(client: ShewenyClient, path: string, mainKey: MKN, options: LoaderOptions) {
    this.client = client;
    this.collection = new Collection<MKV, V[]>();
    this.mainPath = this.absolutePath(path);
    this.paths = [];
    this.mainKey = mainKey;
    this.manager = options.manager;
    this.instance = options.instance;
    this.asyncRead = options.asyncRead ?? false;
  }

  // Load all structures
  public async load(dir: string = this.mainPath) {
    if (dir) await this.readDirectory(this.absolutePath(dir));
    else if (this.mainPath) await this.readDirectory(this.mainPath);
    else new ShewenyError(this.client, 'MISSING_PATH_LOADER');
    if (!this.paths.length) return this.collection;

    if (this.asyncRead) {
      await Promise.all(this.paths.map(async path => await this.loadFileStructures(path)));
    } else {
      for (const path of this.paths) {
        await this.loadFileStructures(path);
      }
    }

    // Return the collection
    return this.collection;
  }

  private absolutePath(...dir: string[]) {
    let main = '';
    if (require.main) main = require.main.path;
    else if (!main) main = process.cwd();

    if (dir) main = resolve(main, ...dir);
    else main = resolve(main);
    return main;
  }

  private async readDirectory(dir: string) {
    const result = await readdir(dir);
    if (this.asyncRead) {
      await Promise.all(
        result.map(async file => {
          const path = resolve(dir, file);
          const stats = await stat(path);
          if (stats.isDirectory()) return this.readDirectory(path);
          else if (stats.isFile()) this.paths.push(path);
        }),
      );
    } else {
      for (const file of result) {
        const path = resolve(dir, file);
        const stats = await stat(path);
        if (stats.isDirectory()) await this.readDirectory(path);
        else if (stats.isFile()) this.paths.push(path);
      }
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
      new ShewenyError(this.client, 'LOAD_ERROR', path, error.message);
    }
  }
  private async loadStructure(StructureToLoad: StructureConstructable<MKN, MKV, V>, path: string) {
    try {
      if (StructureToLoad['_id'] != 'ShewenyLoadable') return;
      const instance: StructureConstructed<MKN, MKV, V> = new StructureToLoad(this.client);
      if (!instance) return;
      // Bad instance
      if (!(instance instanceof this.instance)) return;
      if (!Object.hasOwn(instance, this.mainKey)) {
        return new ShewenyWarning(this.client, 'MISSING_PROPERTY_CLASS', this.mainKey, path);
      }

      let set = [instance];
      const get = this.collection.get(instance[this.mainKey]);
      if (get) {
        get.push(instance);
        set = get;
      }

      // Set data on structure
      instance.path = path;
      instance.manager = this.manager;
      return this.collection.set(instance[this.mainKey], set);
    } catch (err) {
      const error = err as Error;
      return new ShewenyWarning(this.client, 'INVALID_CLASS', StructureToLoad.toString(), path, error);
    }
  }
}
