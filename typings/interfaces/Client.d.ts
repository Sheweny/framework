import type { ClientOptions, Snowflake } from "discord.js";
import type { HandlersOptions } from "./Handlers";
/**
 * Options for Sheweny client framework
 */
export interface ShewenyClientOptions extends ClientOptions {
    mode?: "production" | "development";
    admins?: Snowflake[];
    handlers?: HandlersOptions;
    joinThreadsOnCreate?: boolean;
}
