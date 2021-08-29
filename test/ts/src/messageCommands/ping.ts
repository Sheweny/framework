import { MessageCommand, ShewenyClient } from "../../../../";
import type { Message } from "discord.js";

export class PingCommand extends MessageCommand {
  constructor(client: ShewenyClient) {
    super(client, "ping", {
      description: "Ping the bot",
      category: "Misc",
    });
  }
  execute(message: Message) {
    message.channel.send({ content: "Pong !" });
  }
}
