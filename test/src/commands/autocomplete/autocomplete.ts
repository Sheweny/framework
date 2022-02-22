import { Command, ShewenyClient } from '../../../../';
import { EnumResolvers } from 'discord.js';
import type { AutocompleteInteraction, CommandInteraction } from 'discord.js';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'autocomplete',
      description: 'Test the autocomplete',
      type: 'SLASH_COMMAND',
      category: 'Misc',
      options: [
        {
          name: 'test',
          description: 'The name of the command',
          type: 3,
          autocomplete: true,
        },
      ],
    });
  }
  execute(interaction: CommandInteraction) {
    const option = interaction.options.get('test')?.value;
    interaction.reply('Autocomplete work !' + option);
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
