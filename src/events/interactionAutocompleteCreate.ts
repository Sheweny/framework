import { COMMAND_TYPE } from '../constants/constants.js';
import { ShewenyError } from '../helpers/index.js';
import type { ShewenyClient } from '../client/Client.js';
import type { CommandInteraction, ContextMenuCommandInteraction, AutocompleteInteraction } from 'discord.js';
export default async function run(
  client: ShewenyClient,
  interaction: CommandInteraction | ContextMenuCommandInteraction | AutocompleteInteraction,
) {
  try {
    if (!client.managers.commands) return;

    /* -----------------COMMAND----------------- */
    const commands = client.collections.commands?.get(interaction.commandName);
    if (!commands || (commands && !commands.length)) return;
    for (const command of commands) {
      // eslint-disable-next-line
       // @ts-ignore
      if (!command || (command && ![COMMAND_TYPE.cmdSlash, COMMAND_TYPE.ctxUser, COMMAND_TYPE.ctxMsg].includes(command.type))) {
        return;
      }
      if (interaction.isAutocomplete() && command.onAutocomplete) await command.onAutocomplete(interaction);
    }
  } catch (err) {
    const e = err as Error;
    new ShewenyError(client, e);
  }
}
