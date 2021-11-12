import { Event } from '../../../';
import type { ShewenyClient } from '../../../';
import type { CommandInteraction } from 'discord.js';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'userMissingPermissions', {
      description: 'Missing permissions',
      emitter: client.managers.commands!,
    });
  }
  execute(i: CommandInteraction, permission: string) {
    console.log(permission);

    i.reply('Missing permissions !');
  }
}
