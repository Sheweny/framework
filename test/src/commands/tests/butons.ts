import { Command, ShewenyClient } from "../../../../";
import type { CommandInteraction } from "discord.js";
const { MessageActionRow, MessageButton } = require("discord.js");

export class ButtonsCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, "test-buttons", {
      description: "Test buttons",
      category: "Misc",
      guildOnly: true,
    });
  }
  execute(client: ShewenyClient, interaction: CommandInteraction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton().setCustomId("primary").setLabel("Primary").setStyle("PRIMARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("secondary")
          .setLabel("secondary")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton().setCustomId("success").setLabel("Success").setStyle("SUCCESS")
      );
    interaction.reply({ content: "Test buttons", components: [row] });
  }
}
