import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'userMissingPermissions', {
      description: 'Missing permissions',
      emitter: client.managers.commands!,
    });
  }
  execute(i: CommandInteraction, permission: string) {
    i.reply('Missing permissions !');
  }
}
