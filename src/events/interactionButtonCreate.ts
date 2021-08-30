import { ShewenyError } from "../errors";
import type { ButtonInteraction } from "discord.js";
import type { ShewenyClient } from "../client/Client";
import type { Inhibitor } from "../structures/Inhibitor";

export default async function run(client: ShewenyClient, interaction: ButtonInteraction) {
  if (!client.collections.buttons) return;

  const button = client.collections.buttons.find((value) =>
    value.customId.includes(interaction.customId)
  );

  if (!button) return;
  if (button.before) await button.before(interaction);

  const inhibitors = client.collections.inhibitors?.filter(
    (i: Inhibitor) => i.type.includes("BUTTON") || i.type.includes("ALL")
  );

  if (inhibitors && inhibitors.size) {
    const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
    for (const i of sorted) {
      if (!i.execute(client, interaction)) return i.onFailure(client, interaction);
    }
  }

  try {
    await button.execute(interaction);
  } catch (e: any) {
    new ShewenyError(client, e);
  }
}
