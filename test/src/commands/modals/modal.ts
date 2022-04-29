import { Command, ShewenyClient } from '../../../../';
import { ActionRowBuilder, CommandInteraction, TextInputComponent } from 'discord.js';
import { TextInputBuilder, TextInputStyle, ModalBuilder, ModalActionRowComponent } from 'discord.js';
export class ModalCmd extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'modal',
      description: 'Test modals',
      type: 'SLASH_COMMAND',
    });
  }
  async execute(interaction: CommandInteraction) {
    // Create the modal
    const modal = new ModalBuilder().setTitle('My Awesome Form').setCustomId('AwesomeForm');

    // Create text input fields
    const tvShowInputComponent = new TextInputBuilder()
      .setCustomId('tsField')
      .setLabel('Favorite TV show')
      .setStyle(TextInputStyle.Short);

    const haikuInputComponent = new TextInputBuilder()
      .setCustomId('haikuField')
      .setLabel('Write down your favorite haiku')
      .setStyle(TextInputStyle.Paragraph);
    const rows = [];
    for (const component of [tvShowInputComponent, haikuInputComponent]) {
      rows.push(new ActionRowBuilder<TextInputBuilder>().addComponents([component]));
    }
    // Add action rows to form
    modal.addComponents(rows);
    await interaction.showModal(modal);
  }
}
