import { Button, ShewenyClient } from "../../../";
import type { ButtonInteraction } from "discord.js";

export class SuccessButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["primary", "secondary"]);
  }
  execute(interaction: ButtonInteraction) {
    interaction.reply("Primary and secondary file !");
  }
}
