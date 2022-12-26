import { BaseInteraction, ComponentType, InteractionType as IType, MessageComponentInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';

export default function run(client: ShewenyClient, i: BaseInteraction): void | boolean {
  switch (i.type) {
    case IType.ApplicationCommand:
      return client.emit('interactionCommandCreate', i);
    case IType.ApplicationCommandAutocomplete:
      return client.emit('interactionAutocompleteCreate', i);
    case IType.MessageComponent:
      switch ((i as MessageComponentInteraction).componentType) {
        case ComponentType.Button:
          return client.emit('interactionButtonCreate', i);
        case ComponentType.ChannelSelect:
        case ComponentType.RoleSelect:
        case ComponentType.StringSelect:
        case ComponentType.UserSelect:
        case ComponentType.SelectMenu:
          return client.emit('interactionSelectMenuCreate', i);
      }
      break;
    case IType.ModalSubmit:
      return client.emit('interactionModalSubmitCreate', i);
  }
}
