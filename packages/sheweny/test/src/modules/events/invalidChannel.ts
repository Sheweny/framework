import { Event } from 'sheweny';
import type { ShewenyClient, Command } from 'sheweny';
import type { CommandInteraction, Message } from 'discord.js';

export default class InvalidChannel extends Event {
  constructor(client: ShewenyClient) {
    super(client, 'invalidChannel', {
      description: 'Invalid command channel',
      once: false,
      emitter: client.managers.commands,
    });
  }
  async execute(command: Command, ctx: CommandInteraction | Message): Promise<void> {
    ctx.reply('Vous ne vouvez pas utiliser la commande ' + command.name + ' dans ce type de channel.');
  }
}
