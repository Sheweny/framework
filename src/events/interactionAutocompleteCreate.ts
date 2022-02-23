import { AutocompleteInteraction } from 'discord.js';
import { COMMAND_TYPE } from '../constants/constants';
import { ShewenyError } from '../helpers';
import type { ShewenyClient } from '..';
import type { CommandInteraction, ContextMenuCommandInteraction } from 'discord.js';
export default async function run(
  client: ShewenyClient,
  interaction: CommandInteraction | ContextMenuCommandInteraction | AutocompleteInteraction,
) {
  try {
    if (!client.managers.commands) return;

    /* -----------------COMMAND----------------- */
    const command = client.collections.commands?.get(interaction.commandName);
    // eslint-disable-next-line
    // @ts-ignore
    if (!command || (command && ![COMMAND_TYPE.cmdSlash, COMMAND_TYPE.ctxUser, COMMAND_TYPE.ctxMsg].includes(command.type))) {
      return;
    }
    if (interaction.isAutocomplete() && command.onAutocomplete) return await command.onAutocomplete(interaction);
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
