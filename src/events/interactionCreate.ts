import type { Interaction } from 'discord.js';
import type { ShewenyClient } from '../client/Client';

export default function run(client: ShewenyClient, interaction: Interaction) {
  if (interaction.isButton()) client.emit('interactionButtonCreate', interaction);

  if (interaction.isCommand() || interaction.isContextMenuCommand()) client.emit('interactionCommandCreate', interaction);

  if (interaction.isAutocomplete()) client.emit('interactionAutocompleteCreate', interaction);

  if (interaction.isContextMenuCommand()) client.emit('interactionContextMenuCreate', interaction);

  if (interaction.isSelectMenu()) client.emit('interactionSelectMenuCreate', interaction);

  if (interaction.isMessageComponent()) client.emit('interactionMessageComponentCreate', interaction);
}
