import { ClientOptions, Snowflake } from "discord.js";
import { HandlersOptions } from "./Handlers";

//#region Interfaces

export interface ShewenyClientOptions extends ClientOptions {
  admins?: Snowflake[];
  handlers?: HandlersOptions;
}

//#endregion Interfaces
