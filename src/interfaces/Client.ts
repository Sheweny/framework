import { ClientOptions, Snowflake } from "discord.js";
import { handlersOptions } from "./Handlers";

export interface ShewenyClientOptions extends ClientOptions {
  admins?: Snowflake[];
  handlers?: handlersOptions;
}
