import { ShewenyError } from '../helpers';
import { INHIBITOR_TYPE, MODAL_EVENTS } from '../constants/constants';
import { Collection, ModalSubmitInteraction } from 'discord.js';
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
    /* ---------------COOLDOWNS--------------- */
    if (!client.admins?.includes(interaction.user.id)) {
      if (!client.cooldowns.buttons.has(modal.customId)) {
        client.cooldowns.buttons.set(modal.customId, new Collection<string, number>());
      }

      const timeNow = Date.now();
      const tStamps = client.cooldowns.buttons.get(modal.customId);
      const cdAmount = (modal.cooldown || 0) * 1000;

      if (tStamps) {
        if (tStamps.has(interaction.user.id)) {
          const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
          if (timeNow < cdExpirationTime) {
            // const timeLeft = (cdExpirationTime - timeNow) / 1000;
            return client.managers.buttons?.emit(MODAL_EVENTS.cooldownLimit, interaction, cdExpirationTime - timeNow);
          }
        }

        tStamps.set(interaction.user.id, timeNow);
        setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
      }
    }
    await modal.execute(interaction);
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
