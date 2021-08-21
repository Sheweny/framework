import { ApplicationCommand, ShewenyClient } from "../../../";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends ApplicationCommand {
  constructor(client: ShewenyClient) {
    super(
      client,
      {
        name: "ping",
        description: "Ping the bot",
      },
      {
        category: "Misc",
        userPermissions: ["BOT_ADMIN"],
      }
    );
  }
  execute(interaction: CommandInteraction) {
    interaction.reply("Pong !");
  }
}
