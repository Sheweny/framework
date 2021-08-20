import { CommandInteraction } from "discord.js";
import { ApplicationCommand, ShewenyClient } from "../../../";

export class Ping extends ApplicationCommand {
  constructor(client: ShewenyClient) {
    super(
      client,
      {
        name: "ping",
        description: "Ping Pong",
        type: "CHAT_INPUT",
      },
      { category: "test" }
    );
  }

  execute(interaction: CommandInteraction) {
    return interaction.reply({ content: "PONG" });
  }
}
