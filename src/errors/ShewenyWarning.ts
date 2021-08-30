import type { ShewenyClient } from "../client/Client";

export class ShewenyWarning {
  constructor(client: ShewenyClient, message: string) {
    if (!client || client.mode !== "development") return;

    if (client.mode === "development") {
      console.warn(`\x1b[33m${message}\x1b[0m`);
      console.log("");
    } else {
      client.emit("warn", message);
    }
  }
}
