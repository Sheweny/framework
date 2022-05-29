
import { resolve } from 'path';
import { readDirAndPush } from './readDirFiles';
import { Collection } from 'discord.js';
import { ShewenyError, ShewenyWarning } from '../helpers';

import type { ShewenyClient } from '../client/Client';
import type { LoadFilesOptions } from '../typescript/interfaces';
import type { Constructable } from '../typescript/utilityTypes';

// Old version
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
        new ShewenyWarning(client, 'INVALID_CLASS', Structure.toString(), filePath);
        continue;
      }
    }

    return collection;
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}






import { readdir, stat } from "fs/promises";

// Version 2.0.0
type StructureType<S> = new(client:ShewenyClient) => S;
export class Loader<K, V> {

  public client : ShewenyClient;
  public collection: Collection<K, V>;
  public mainKey: string;
  public mainPath:string;
  public paths : Array<string>;

  constructor(client:ShewenyClient, path:string, mainKey:string){
    this.client = client;
    this.collection = new Collection<K, V>();
    this.mainPath = path;
    this.paths = [];
    this.mainKey = mainKey;
  }
  
  // Return the number of loaded paths
  public async load(dir:string = this.mainPath){
    if(dir) await this.readDirectory(dir);
    else if(this.mainPath) await this.readDirectory(this.mainPath);
    else new ShewenyError(this.client, "MISSING_PATH_LOADER");
    if(!this.paths.length) return this.collection;
    for(const path of this.paths){
      await this.loadFileStructures(path);
    }
    return this.collection;
  }

  private async readDirectory(dir:string){
    const result = await readdir(dir)
    for(const item of result){
      const resolvedPath:string = resolve(dir, item)
      const infos = await stat(resolvedPath);
      if(infos.isDirectory()) await this.readDirectory(resolvedPath)
      else this.paths.push(resolvedPath);
    }
  }

  private async loadFileStructures(path:string){
    try {
      const imported = await import(path);
      const keys = Object.keys(imported);
      if(keys){
        for(const key of keys){
          await this.loadStructure(imported[key], path);
        }
      } else {
        await this.loadStructure(imported, path);
      }
    } catch (err) {
      const error = err as Error;
      //TODO: Handle this error
      new ShewenyError(this.client, error);
    }
  }
  private async loadStructure(Structure:StructureType<V>, path:string){
    try {
      const instance:any = new Structure(this.client);
      if(!instance) return;
      if(!Object.hasOwn(instance, this.mainKey)) return new ShewenyWarning(this.client, "MISSING_PROPERTY_CLASS", this.mainKey, path); 
      if(this.collection.get(instance[this.mainKey])){
        new ShewenyWarning(this.client, "DUPLICATE_CLASS", path)

      }

    } catch (err) {
      const error = err as Error;
      // TODO: Implement this error
      new ShewenyWarning(this.client, "INVALID_CLASS", Structure.toString(), path, error)
    }
  }
}
