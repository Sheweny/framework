import { Command, ShewenyClient } from '../../../../';
import type { AutocompleteInteraction, CommandInteraction } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'autocomplete',
      description: 'Test the autocomplete',
      type: 'SLASH_COMMAND',
      category: 'Misc',
      options: [
        { name: 'name', description: 'description', type: 'STRING', autocomplete: true },
        { name: 'theme', description: 'description', type: 'STRING', autocomplete: true },
      ],
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply('Autocomplete work !');
  }
  onAutocomplete(interaction: AutocompleteInteraction) {
    const focusedOption = interaction.options.getFocused(true);

    let choices: any;

    if (focusedOption.name === 'name') {
      choices = ['faq', 'install', 'collection', 'promise', 'debug'];
    }

    if (focusedOption.name === 'theme') {
      choices = ['halloween', 'christmas', 'summer'];
    }

    const filtered = choices!.filter((choice: any) => choice.startsWith(focusedOption.value));
    interaction
      .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
      .then(console.log)
      .catch(console.error);
  }
}
