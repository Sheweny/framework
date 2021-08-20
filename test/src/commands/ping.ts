import { CommandInteraction } from "discord.js";
import { ApplicationCommand, ShewenyClient } from "../../../";

export class Ping extends ApplicationCommand {
  constructor(client: ShewenyClient) {
    super(
      client,
      {
        name: "ping-1851",
        description: "Ping Pong",
      },
      { category: "test" }
    );
  }

  execute(interaction: CommandInteraction) {
    return interaction.reply({ content: "PONG" });
  }
}
