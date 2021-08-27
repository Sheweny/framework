import { Event } from "../../..";
import type { ShewenyClient } from "../../..";

export class ReadyEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      once: true,
    });
  }
  execute() {
    console.log(`${this.client.user?.tag} is connected`);
  }
}
