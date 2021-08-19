import type { ButtonInteraction } from "discord.js";
import type { ShewenyClient } from "../index";

export default async function run(client: ShewenyClient, interaction: ButtonInteraction) {
  if (!client.buttons) return;

  const button = client.buttons.find((value) =>
    value.customId.includes(interaction.customId)
  );

  if (!button) return;

  try {
    await button.execute!(interaction);
  } catch (e) {
    console.error(e);
  }
}
