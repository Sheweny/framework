import { Command, ShewenyClient } from "../../../";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, "ping", {
      description: "Ping the bot",
      category: "Misc",
      guildOnly: true,
    });
  }
  execute(client: ShewenyClient, interaction: CommandInteraction) {
    interaction.reply("Pong !");
  }
}
