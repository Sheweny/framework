import type { ButtonInteraction } from "discord.js";
import type { ShewenyClient } from "../client/Client";

export abstract class Button {
  public client: ShewenyClient;
  public path: string = "";
  public customId: string[];

  constructor(client: ShewenyClient, customId: string[]) {
    this.client = client;
    this.customId = customId;
  }

  before?(interaction: ButtonInteraction): any | Promise<any>;

  abstract execute(interaction: ButtonInteraction): any | Promise<any>;
}
