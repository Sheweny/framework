import { Event } from '../../../../';
import type { ShewenyClient } from '../../../../';
import type { ButtonInteraction } from 'discord.js';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'cooldownLimit', {
      description: '',
      once: false,
      emitter: client.managers.buttons,
    });
  }
  async execute(interaction: ButtonInteraction, cooldown: number): Promise<void> {
    interaction.reply(
      `You have reached the cooldown limit. Please wait ${cooldown / 1000} seconds before using this button again.`
    );
  }
}
