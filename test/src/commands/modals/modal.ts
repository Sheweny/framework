import { Command, ShewenyClient } from '../../../../';
import type { CommandInteraction } from 'discord.js';
import { ActionRow, TextInputComponent, TextInputStyle, Modal, type ModalActionRowComponent } from 'discord.js';
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
    const modal = new Modal().setTitle('My Awesome Form').setCustomId('AwesomeForm');

    // Create text input fields
    const tvShowInputComponent = new TextInputComponent()
      .setCustomId('tsField')
      .setLabel('Favorite TV show')
      .setStyle(TextInputStyle.Short);

    const haikuInputComponent = new TextInputComponent()
      .setCustomId('haikuField')
      .setLabel('Write down your favorite haiku')
      .setStyle(TextInputStyle.Paragraph);

    const rows = [tvShowInputComponent, haikuInputComponent].map(component =>
      new ActionRow<ModalActionRowComponent>().addComponents(component),
    );

    // Add action rows to form
    modal.addComponents(...rows);
    await interaction.showModal(modal);
  }
}
