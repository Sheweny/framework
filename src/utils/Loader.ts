import { Collection } from 'discord.js';
import { ShewenyError, ShewenyWarning } from '../helpers/index.js';

import type { ShewenyClient } from '../client/Client.js';
// import type { Constructable } from '../typescript/utilityTypes';

import { readdir, stat } from 'fs/promises';
import { resolve } from 'node:path';
import type { BaseStructure } from '../structures/index.js';
import type { Class, Manager, Structure } from '../typescript/index.js';

// Version 2.0.0
// type property = string; // | number | symbol;
/* type WithProperty<K extends property, V = {}> = {
  [P in K] : V
}*/
type WithMainProperty<K extends string, V> = { [P in K]: V };
type StructureConstructed<MKN extends string, MKV, V> = V & WithMainProperty<MKN, MKV>;
type StructureConstructable<MKN extends string, MKV, S> = {_id:string} & (new (client: ShewenyClient) => S & WithMainProperty<MKN, MKV>);
type StructureType<MKN extends string, MKV> = BaseStructure & WithMainProperty<MKN, MKV>;

interface LoaderOptions {
  instance: Class<Structure>;
  manager: Manager;
}

export class Loader<MKN extends string, MKV, V extends StructureType<MKN, MKV>> {
  public client: ShewenyClient;
  public collection: Collection<MKV, V>;
  public mainKey: MKN;
  public mainPath: string;
  public paths: Array<string>;
  public manager: Manager;
  public instance: Class<Structure>;

  constructor(client: ShewenyClient, path: string, mainKey: MKN, options: LoaderOptions) {
    this.client = client;
    this.collection = new Collection<MKV, V>();
    this.mainPath = this.absolutePath(path);
    this.paths = [];
    this.mainKey = mainKey;
    this.manager = options.manager;
    this.instance = options.instance;
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
  private async loadStructure(StructureToLoad: StructureConstructable<MKN, MKV, V>, path: string) {
    try {
      if(StructureToLoad["_id"] != "ShewenyLoadable") return;
      const instance: StructureConstructed<MKN, MKV, V> = new StructureToLoad(this.client);
      if (!instance) return;
      // Bad instance
      if (!(instance instanceof this.instance)) return;
      if (!Object.hasOwn(instance, this.mainKey)) {
        return new ShewenyWarning(this.client, 'MISSING_PROPERTY_CLASS', this.mainKey, path);
      }
      if (this.collection.get(instance[this.mainKey])) {
        return new ShewenyWarning(this.client, 'DUPLICATE_CLASS', `${instance[this.mainKey]}`, path);
      }

      // Set data on structure
      instance.path = path;
      instance.manager = this.manager;

      return this.collection.set(instance[this.mainKey], instance);
    } catch (err) {
      const error = err as Error;
      // TODO: Implement this error
      return new ShewenyWarning(this.client, 'INVALID_CLASS', StructureToLoad.toString(), path, error);
    }
  }
}
