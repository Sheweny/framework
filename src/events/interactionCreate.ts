import { ComponentType, Interaction, InteractionType, MessageComponentInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';

export default function run(client: ShewenyClient, i: Interaction) {
  if (i.type === InteractionType.MessageComponent && (i as MessageComponentInteraction).componentType === ComponentType.Button) {
    client.emit('interactionButtonCreate', i);
  }

  if (i.type === InteractionType.ApplicationCommand) client.emit('interactionCommandCreate', i);

  if (i.type === InteractionType.ApplicationCommandAutocomplete) client.emit('interactionAutocompleteCreate', i);

  if (
    i.type === InteractionType.MessageComponent &&
    (i as MessageComponentInteraction).componentType === ComponentType.SelectMenu
  ) {
    client.emit('interactionSelectMenuCreate', i);
  }

  if (i.type === InteractionType.ModalSubmit) client.emit('interactionModalSubmitCreate', i);
}
