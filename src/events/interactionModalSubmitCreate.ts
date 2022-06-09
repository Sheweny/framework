import { ShewenyError } from '../helpers/index.js';
import { INHIBITOR_TYPE, MODAL_EVENTS } from '../constants/constants.js';
import { Collection, ModalSubmitInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { Inhibitor, Modal } from '../structures/index.js';

export default async function run(client: ShewenyClient, interaction: ModalSubmitInteraction) {
  try {
    if (!client.collections.modals) return;

    const modals: Modal[] = [];
    for (const [, structure] of client.collections.modals) {
      if (!structure || (structure && !structure.length)) return;
      for (const modal of structure) {
        for (const customId of modal.customId) {
          if (!(customId instanceof RegExp) && customId === interaction.customId) {
            modals.push(modal);
          } else if (customId instanceof RegExp && customId.test(interaction.customId)) {
            customId.lastIndex = 0;
            modals.push(modal);
          }
        }
      }
    }

    if (!modals || (modals && !modals.length)) return;
    for (const modal of modals) {
      await (async () => {
        if (!modal.enabled) return;
        if (modal.before) await modal.before(interaction);

        /**
         * Handle inhibitors
         */
        const inhibitorsCollection = client.collections.inhibitors?.filter((is: Inhibitor[]) => {
          for (const i of is) {
            return i.type.includes(INHIBITOR_TYPE.modal) || i.type.includes(INHIBITOR_TYPE.all);
          }
          return false;
        });
        const inhibitorsArray: Inhibitor[] = [];
        for (const [, inhibitors] of inhibitorsCollection) {
          if (inhibitors && inhibitors.length) {
            for (const inhibitor of inhibitors) {
              inhibitorsArray.push(inhibitor);
            }
          }
        }
        if (inhibitorsArray && inhibitorsArray.length) {
          const sorted = inhibitorsArray.sort((a, b) => b.priority - a.priority);
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
      })();
    }
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
