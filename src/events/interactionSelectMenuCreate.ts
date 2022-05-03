import { INHIBITOR_TYPE, SELECT_EVENTS } from '../constants/constants';
import { ShewenyError } from '../helpers';
import { Collection } from 'discord.js';
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
            if (!(element instanceof RegExp)) return false;
            if (element.test(interaction.customId)) {
              element.lastIndex = 0;
              return true;
            }
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
        if (!(await i.execute(client, interaction))) return await i.onFailure(client, interaction);
      }
    }
    /* ---------------COOLDOWNS--------------- */
    if (!client.admins?.includes(interaction.user.id)) {
      if (!client.cooldowns.selectMenus.has(selectMenu.customId)) {
        client.cooldowns.selectMenus.set(selectMenu.customId, new Collection<string, number>());
      }
      const timeNow = Date.now();
      const tStamps = client.cooldowns.selectMenus.get(selectMenu.customId)!;
      const cdAmount = (selectMenu.cooldown || 0) * 1000;
      if (tStamps.has(interaction.user.id)) {
        const cdExpirationTime = (tStamps.get(interaction.user.id) || 0) + cdAmount;
        if (timeNow < cdExpirationTime) {
          // const timeLeft = (cdExpirationTime - timeNow) / 1000;
          return client.managers.selectMenus?.emit(SELECT_EVENTS.cooldownLimit, interaction, cdExpirationTime - timeNow);
        }
      }

      tStamps.set(interaction.user.id, timeNow);
      setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
    }

    await selectMenu.execute(interaction);
  } catch (e: any) {
    new ShewenyError(client, e);
  }
}
