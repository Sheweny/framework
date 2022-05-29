"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const __1 = require("../../../../");
class PingCommand extends __1.Command {
    constructor(client) {
        super(client, {
            name: 'autocomplete',
            description: 'Test the autocomplete',
            type: 'SLASH_COMMAND',
            category: 'Misc',
            options: [
                {
                    name: 'name',
                    description: 'The name of the command',
                    type: 3,
                    autocomplete: true,
                },
            ],
        });
    }
    execute(interaction) {
        const option = interaction.options.get('test')?.value;
        interaction.reply('Autocomplete work !' + option);
    }
    onAutocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices;
        if (focusedOption.name === 'name') {
            choices = ['faq', 'install', 'collection', 'promise', 'debug'];
        }
        if (focusedOption.name === 'theme') {
            choices = ['halloween', 'christmas', 'summer'];
        }
        const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
        interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
    }
}
exports.PingCommand = PingCommand;
