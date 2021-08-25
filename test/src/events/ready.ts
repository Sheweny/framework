import { Event } from "../../../";
import type { ShewenyClient } from "../../../";
import type { Client } from "discord.js";

export class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
    });
  }
  execute(client: Client) {
    console.log("The client is logged in");
  }
}
