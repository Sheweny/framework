import { Command } from "../../..";
import type { ShewenyClient } from "../../..";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "pppppp",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply("PPPPPPP");
  }
}
