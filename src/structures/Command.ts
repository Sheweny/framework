import type { ShewenyClient } from "../client/Client";
import type { CommandData } from "../interfaces/Command";

export abstract class Command {
  public client: ShewenyClient;
  public path: string = "";
  public data: CommandData;

  constructor(client: ShewenyClient, data: CommandData) {
    this.client = client;
    this.data = data;
  }

  before?(...args: any[]): any | Promise<any>;

  abstract execute(...args: any[]): any | Promise<any>;
}
