import { INHIBITOR_TYPE } from '../constants/constants';
import { ShewenyError } from '../helpers';
import type { SelectMenuInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client';
import type { Inhibitor } from '../structures/Inhibitor';
export default async function run(client: ShewenyClient, interaction: SelectMenuInteraction) {
  try {
    if (!client.collections.selectMenus) return;

    // Exact match
    let selectMenu = client.collections.selectMenus
      .filter((b) => b.customId.some((id) => !(id instanceof RegExp)))
      .find((value) => (value.customId as string[]).includes(interaction.customId));
    // Regex match
    if (!selectMenu) {
      selectMenu = client.collections.selectMenus
        .filter((b) => b.customId.some((id) => id instanceof RegExp))
        .find((value) => {
          return value.customId.some((element) => {
            return (element as RegExp).test(interaction.customId);
          });
        });
    }
    if (!selectMenu) return;
    if (selectMenu.before) await selectMenu.before(interaction);

    const inhibitors = client.collections.inhibitors?.filter(
      (i: Inhibitor) => i.type.includes(INHIBITOR_TYPE.select) || i.type.includes(INHIBITOR_TYPE.all)
    );

    if (inhibitors && inhibitors.size) {
      const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
      for (const i of sorted) {
        if (!i.execute(client, interaction)) return i.onFailure(client, interaction);
      }
    }

    await selectMenu.execute(interaction);
  } catch (e: any) {
    new ShewenyError(client, e);
  }
}
