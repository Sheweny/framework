import { ShewenyError } from '../helpers';
import { INHIBITOR_TYPE } from '../constants/constants';
import type { ModalSubmitInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client';
import type { Inhibitor } from '../structures/Inhibitor';
export default async function run(client: ShewenyClient, interaction: ModalSubmitInteraction) {
  try {
    if (!client.collections.modals) return;

    // Exact match
    let modal = client.collections.modals
      .filter(m => m.customId.some(id => !(id instanceof RegExp)))
      .find(value => (value.customId as string[]).includes(interaction.customId));
    // Regex match
    if (!modal) {
      modal = client.collections.modals
        .filter(m => m.customId.some(id => id instanceof RegExp))
        .find(value => {
          return value.customId.some(element => {
            if ((element as RegExp).test(interaction.customId)) {
              (element as RegExp).lastIndex = 0;
              return true;
            }
          });
        });
    }

    if (!modal) return;

    if (modal.before) await modal.before(interaction);

    const inhibitors = client.collections.inhibitors?.filter(
      (i: Inhibitor) => i.type.includes(INHIBITOR_TYPE.modal) || i.type.includes(INHIBITOR_TYPE.all),
    );

    if (inhibitors && inhibitors.size) {
      const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
      for (const i of sorted) {
        if (!(await i.execute(client, interaction))) return await i.onFailure(client, interaction);
      }
    }

    await modal.execute(interaction);
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
