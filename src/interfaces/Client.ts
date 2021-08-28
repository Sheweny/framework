import type { ClientOptions, Snowflake } from "discord.js";
import type { ConnectOptions } from "mongoose";
import type { HandlersOptions } from "./Handlers";

//#region Interfaces

interface DatabaseOptions {
  uri: string;
  connectOptions?: ConnectOptions;
  directory?: string;
}

/**
 * Options for Sheweny client framework
 */
export interface ShewenyClientOptions extends ClientOptions {
  admins?: Snowflake[];
  handlers?: HandlersOptions;
  db?: DatabaseOptions;
  joinThreadsOnCreate?: boolean;
}

//#endregion Interfaces
