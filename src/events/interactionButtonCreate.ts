import { Collection } from 'discord.js';
import { ShewenyError } from '../helpers/index.js';
import { INHIBITOR_TYPE, BUTTON_EVENTS } from '../constants/constants.js';
import type { ButtonInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { Inhibitor, Button } from '../structures/index.js';
export default async function run(client: ShewenyClient, interaction: ButtonInteraction) {
  try {
    if (!client.collections.buttons) return;

    const buttons: Button[] = [];
    for (const [, structure] of client.collections.buttons) {
      if (!structure || (structure && !structure.length)) return;
      for (const button of structure) {
        for (const customId of button.customId) {
          if (!(customId instanceof RegExp) && customId === interaction.customId) {
            buttons.push(button);
          } else if (customId instanceof RegExp && customId.test(interaction.customId)) {
            customId.lastIndex = 0;
            buttons.push(button);
          }
        }
      }
    }
    if (!buttons || (buttons && !buttons.length)) return;
    for (const button of buttons) {
      if (button.before) await button.before(interaction);

      /**
       * Handle inhibitors
       */
      const inhibitorsCollection = client.collections.inhibitors?.filter((is: Inhibitor[]) => {
        for (const i of is) {
          return i.type.includes(INHIBITOR_TYPE.button) || i.type.includes(INHIBITOR_TYPE.all);
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
        if (!client.cooldowns.buttons.has(button.customId)) {
          client.cooldowns.buttons.set(button.customId, new Collection<string, number>());
        }

        const timeNow = Date.now();
        const tStamps = client.cooldowns.buttons.get(button.customId);
        const cdAmount = (button.cooldown || 0) * 1000;

        if (tStamps) {
          if (tStamps.has(interaction.user.id)) {
            const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
            if (timeNow < cdExpirationTime) {
              // const timeLeft = (cdExpirationTime - timeNow) / 1000;
              return client.managers.buttons?.emit(BUTTON_EVENTS.cooldownLimit, interaction, cdExpirationTime - timeNow);
            }
          }

          tStamps.set(interaction.user.id, timeNow);
          setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
        }
      }

      await button.execute(interaction);
    }
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
