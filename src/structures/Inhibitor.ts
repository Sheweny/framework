import { ShewenyClient } from "../client/Client";

type InhibitorType =
  | "MESSAGE_COMMAND"
  | "APPLICATION_COMMAND"
  | "BUTTON"
  | "SELECT_MENU"
  | "ALL";

interface InhibitorOptions {
  type?: InhibitorType[];
  priority?: number;
}

export abstract class Inhibitor {
  public client: ShewenyClient;
  public path?: string;
  public name: string;
  public type: InhibitorType[];
  public priority: number;

  constructor(client: ShewenyClient, name: string, options?: InhibitorOptions) {
    this.client = client;
    this.name = name;
    this.type = options?.type || ["MESSAGE_COMMAND"];
    this.priority = options?.priority || 0;
  }

  abstract onFailure(...args: any[]): any | Promise<any>;

  abstract execute(...args: any[]): any | Promise<any>;
}
