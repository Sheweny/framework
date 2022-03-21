import { ShewenyError } from '../helpers';
import { BUTTON_EVENTS, INHIBITOR_TYPE } from '../constants/constants';
import { Collection } from 'discord.js';
import type { ButtonInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client';
import type { Inhibitor } from '../structures/Inhibitor';
export default async function run(client: ShewenyClient, interaction: ButtonInteraction) {
  try {
    if (!client.collections.buttons) return;

    // Exact match
    let button = client.collections.buttons
      .filter((b) => b.customId.some((id) => !(id instanceof RegExp)))
      .find((value) => (value.customId as string[]).includes(interaction.customId));
    // Regex match
    if (!button) {
      button = client.collections.buttons
        .filter((b) => b.customId.some((id) => id instanceof RegExp))
        .find((value) => {
          return value.customId.some((element) => {
            if ((element as RegExp).test(interaction.customId)) {
              (element as RegExp).lastIndex = 0;
              return true;
            }
          });
        });
    }

    if (!button) return;

    if (button.before) await button.before(interaction);

    const inhibitors = client.collections.inhibitors?.filter(
      (i: Inhibitor) => i.type.includes(INHIBITOR_TYPE.button) || i.type.includes(INHIBITOR_TYPE.all)
    );

    if (inhibitors && inhibitors.size) {
      const sorted = [...inhibitors.values()].sort((a, b) => b.priority - a.priority);
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
      const tStamps = client.cooldowns.buttons.get(button.customId)!;
      const cdAmount = (button.cooldown || 0) * 1000;

      if (tStamps.has(interaction.user.id)) {
        console.log(0);

        const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
        console.log(1);

        if (timeNow < cdExpirationTime) {
          console.log(2);

          // const timeLeft = (cdExpirationTime - timeNow) / 1000;
          return client.managers.buttons?.emit(BUTTON_EVENTS.cooldownLimit, interaction, cdExpirationTime - timeNow);
        }
      }

      tStamps.set(interaction.user.id, timeNow);
      setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
    }

    await button.execute(interaction);
  } catch (e: any) {
    new ShewenyError(client, e);
  }
}
