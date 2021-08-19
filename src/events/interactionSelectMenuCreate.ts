import type { SelectMenuInteraction } from "discord.js";
import type { ShewenyClient } from "../index";

export default async function run(
  client: ShewenyClient,
  interaction: SelectMenuInteraction
) {
  if (!client.selectmenus) return;

  const selectMenu = client.selectmenus.find((value) =>
    value.customId.includes(interaction.customId)
  );
  if (!selectMenu) return;

  try {
    await selectMenu.execute!(interaction);
  } catch (e) {
    console.error(e);
  }
}
