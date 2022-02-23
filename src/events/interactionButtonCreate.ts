import { ShewenyError } from '../helpers';
import { INHIBITOR_TYPE } from '../constants/constants';
import type { ButtonInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client';
import type { Inhibitor } from '../structures/Inhibitor';
export default async function run(client: ShewenyClient, interaction: ButtonInteraction) {
  try {
    if (!client.collections.buttons) return;

    // Exact match
    let button = client.collections.buttons
      .filter(b => b.customId.some(id => !(id instanceof RegExp)))
      .find(value => (value.customId as string[]).includes(interaction.customId));
    // Regex match
    if (!button) {
      button = client.collections.buttons
        .filter(b => b.customId.some(id => id instanceof RegExp))
        .find(value => {
          return value.customId.some(element => {
            return (element as RegExp).test(interaction.customId);
          });
        });
    }

    if (!button) return;

    if (button.before) await button.before(interaction);

    const inhibitors = client.collections.inhibitors?.filter(
      (i: Inhibitor) => i.type.includes(INHIBITOR_TYPE.button) || i.type.includes(INHIBITOR_TYPE.all),
    );

    if (inhibitors && inhibitors.size) {
      const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
      for (const i of sorted) {
        if (!i.execute(client, interaction)) return i.onFailure(client, interaction);
      }
    }

    await button.execute(interaction);
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
