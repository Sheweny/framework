import { SelectMenuInteraction } from "discord.js";
import { ShewenyClient } from "..";
import { Inhibitor } from "../structures";

export default async function run(
  client: ShewenyClient,
  interaction: SelectMenuInteraction
) {
  if (!client.selectMenus) return;

  /**
   * Handle inhibitors
   */
  const inhibitors = client.inhibitors?.filter(
    (i: Inhibitor) => i.type === "SELECT_MENU" || i.type === "ALL"
  );
  if (!inhibitors || !inhibitors.size) return;
  const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
  for (const i of sorted) {
    if (!i.execute(client, interaction)) return i.onFailure(client, interaction);
  }
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
