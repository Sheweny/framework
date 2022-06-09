import { INHIBITOR_TYPE, SELECT_EVENTS } from '../constants/constants.js';
import { ShewenyError } from '../helpers/index.js';
import { Collection, SelectMenuInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { Inhibitor, SelectMenu } from '../structures/index.js';
export default async function run(client: ShewenyClient, interaction: SelectMenuInteraction) {
  try {
    if (!client.collections.selectMenus) return;

    const selects: SelectMenu[] = [];
    for (const [, structure] of client.collections.selectMenus) {
      if (!structure || (structure && !structure.length)) return;
      for (const select of structure) {
        for (const customId of select.customId) {
          if (!(customId instanceof RegExp) && customId === interaction.customId) {
            selects.push(select);
          } else if (customId instanceof RegExp && customId.test(interaction.customId)) {
            customId.lastIndex = 0;
            selects.push(select);
          }
        }
      }
    }

    if (!selects || (selects && !selects.length)) return;
    for (const selectMenu of selects) {
      await (async () => {
        if (!selectMenu) return;
        if (selectMenu.before) await selectMenu.before(interaction);

        /**
         * Handle inhibitors
         */
        const inhibitorsCollection = client.collections.inhibitors?.filter((is: Inhibitor[]) => {
          for (const i of is) {
            return i.type.includes(INHIBITOR_TYPE.select) || i.type.includes(INHIBITOR_TYPE.all);
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
          if (!client.cooldowns.buttons.has(selectMenu.customId)) {
            client.cooldowns.buttons.set(selectMenu.customId, new Collection<string, number>());
          }

          const timeNow = Date.now();
          const tStamps = client.cooldowns.buttons.get(selectMenu.customId);
          const cdAmount = (selectMenu.cooldown || 0) * 1000;

          if (tStamps) {
            if (tStamps.has(interaction.user.id)) {
              const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
              if (timeNow < cdExpirationTime) {
                // const timeLeft = (cdExpirationTime - timeNow) / 1000;
                return client.managers.buttons?.emit(SELECT_EVENTS.cooldownLimit, interaction, cdExpirationTime - timeNow);
              }
            }

            tStamps.set(interaction.user.id, timeNow);
            setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
          }
        }
        await selectMenu.execute(interaction);
      })();
    }
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
