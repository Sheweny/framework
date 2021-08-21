import { ApplicationCommand, ShewenyClient } from "../../../../";
import type { CommandInteraction } from "discord.js";
import { MessageSelectMenu, MessageActionRow } from "discord.js";

export class PingCommand extends ApplicationCommand {
  constructor(client: ShewenyClient) {
    super(
      client,
      {
        name: "test-selectmenus",
        description: "Send buttons",
      },
      {
        category: "Tests",
      }
    );
  }
  execute(interaction: CommandInteraction) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "First option",
            description: "The first option",
            value: "first_option",
          },
          {
            label: "Second option",
            description: "The second option",
            value: "second_option",
          },
        ])
    );
    interaction.reply({ content: "Test the select-menus", components: [row] });
  }
}
