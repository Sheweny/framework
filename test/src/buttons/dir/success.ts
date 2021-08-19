import { Button, ShewenyClient } from "../../../../";
import type { ButtonInteraction } from "discord.js";

export class SuccessButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["success"]);
  }
  execute(interaction: ButtonInteraction) {
    interaction.reply("Success file !");
  }
}
