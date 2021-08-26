import type { SelectMenuInteraction } from "discord.js";
import type { ShewenyClient } from "../client/Client";

export abstract class SelectMenu {
  public client: ShewenyClient;
  public path: string = "";
  public customId: string[];

  constructor(client: ShewenyClient, customId: string[]) {
    this.client = client;
    this.customId = customId;
  }

  before?(interaction: SelectMenuInteraction): any | Promise<any>;

  abstract execute(interaction: SelectMenuInteraction): any | Promise<any>;
}
