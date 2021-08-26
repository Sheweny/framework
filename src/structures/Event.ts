import type { ClientEvents } from "discord.js";
import type { ShewenyClient } from "../client/Client";

interface EventOptions {
  description?: string;
  once?: boolean;
}

export abstract class Event {
  public client: ShewenyClient;
  public path: string = "";
  public name: keyof ClientEvents;
  public description: string;
  public once: boolean;

  constructor(client: ShewenyClient, name: keyof ClientEvents, options?: EventOptions) {
    this.client = client;
    this.name = name;
    this.description = options?.description || "";
    this.once = options?.once || false;
  }

  before?(...args: any[]): any | Promise<any>;

  abstract execute(...args: any[]): any | Promise<any>;
}
