import { type Command, Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'userMissingPermissions', {
      description: 'Missing permissions',
      emitter: client.managers.commands,
    });
  }
  execute(i: CommandInteraction, perms: string[], command: Command) {
    console.log('MISSING_PERMISSIONS => Command: ', command.name, '\nPermissions: ', perms.join(', '));
    i.reply('Missing permissions !');
  }
}
