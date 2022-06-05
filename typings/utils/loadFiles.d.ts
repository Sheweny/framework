import { Collection } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { LoadFilesOptions } from '../typescript/interfaces';
export declare function loadFiles<K, V>(client: ShewenyClient, options: LoadFilesOptions): Promise<Collection<K, V> | undefined>;
