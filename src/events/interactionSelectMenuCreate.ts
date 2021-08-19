import type { SelectMenuInteraction } from "discord.js";
import type { ShewenyClient } from "..";

export default async function run(
  client: ShewenyClient,
  interaction: SelectMenuInteraction
) {
  if (!client.selectMenus) return;

  const selectMenu = client.selectMenus.find((value) =>
    value.customId.includes(interaction.customId)
  );
  if (!selectMenu) return;

  try {
    await selectMenu.execute!(interaction);
  } catch (e) {
    console.error(e);
  }
}
