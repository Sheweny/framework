import { Inhibitor } from "../../../";
import type { ShewenyClient } from "../../../";
import type { CommandInteraction } from "discord.js";

export class BlackListInhibitor extends Inhibitor {
  constructor(client: ShewenyClient) {
    super(client, "blacklist", {
      type: ["ALL"],
    });
  }
  execute(client: ShewenyClient, interaction: CommandInteraction) {
    return !["877090306103840778"].includes(interaction.guildId!);
  }
  onFailure(client: ShewenyClient, interaction: CommandInteraction) {
    interaction.reply("Your guild is blacklisted.");
  }
}
