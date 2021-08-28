import { ClientOptions, Snowflake } from "discord.js";
import { HandlersOptions } from "./Handlers";

//#region Interfaces

/**
 * Options for Sheweny client framework
 */
export interface ShewenyClientOptions extends ClientOptions {
  admins?: Snowflake[];
  handlers?: HandlersOptions;
  joinThreadsOnCreate?: boolean;
}

//#endregion Interfaces
