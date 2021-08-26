import type { ShewenyClient } from "../";

/**
 * Represent a Base of any structure
 * @class BaseStructure
 * @abstract
 */
export abstract class BaseStructure {
  public client: ShewenyClient;
  public path?: string;

  constructor(client: ShewenyClient, path?: string) {
    this.client = client;
    this.path = path;
  }
}
