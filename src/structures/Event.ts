import type { ShewenyClient } from "../client/Client";

interface EVentOptions {
  description?: string;
  once?: boolean;
}

export abstract class Event {
  public client: ShewenyClient;
  public path: string = "";
  public name: string;
  public description: string;
  public once: boolean;

  constructor(client: ShewenyClient, name: string, options?: EVentOptions) {
    this.client = client;
    this.name = name;
    this.description = options?.description || "";
    this.once = options?.once || false;
  }

  before?(...args: any[]): any | Promise<any>;

  abstract execute(...args: any[]): any | Promise<any>;
}
