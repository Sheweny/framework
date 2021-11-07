import { Collection } from 'discord.js';
import type { ShewenyClient } from '../client/Client';
export declare function loadFiles<K, V>(client: ShewenyClient | any, directory: string, key: string): Promise<Collection<K, V> | undefined>;
