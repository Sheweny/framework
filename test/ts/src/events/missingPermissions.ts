import { Event } from '../../../../';
import type { ShewenyClient } from '../../../../';
import type { CommandInteraction } from 'discord.js';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'userMissingPermissions', {
      description: 'Client is logged in',
      emitter: client.managers.commands!,
    });
  }
  execute(i: CommandInteraction) {
    i.reply('Missing permissions !');
  }
}
