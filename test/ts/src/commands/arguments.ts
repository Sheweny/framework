import { Command } from "../../../../";
import type { ShewenyClient } from "../../../../";
import type { Message } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "argument",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
      userPermissions: ["ADMINISTRATOR"],
      adminsOnly: true,
      // args: [
      //   {
      //     name: "channel",
      //     type: "CHANNEL",
      //   },
      // ],
    });
  }
  execute(message: Message, args: any) {
    console.log(args);
  }
}
