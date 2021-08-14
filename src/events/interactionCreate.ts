import type { Interaction } from 'discord.js'
import type { ShewenyClient } from '../index';
export default function run(client: ShewenyClient, interaction: Interaction) {
	if (interaction.isButton()) client.emit('interactionButtonCreate', (interaction))
	if (interaction.isCommand()) client.emit('interactionCommandCreate', (interaction))
	if (interaction.isContextMenu()) client.emit('interactionContextMenuCreate', (interaction))
	if (interaction.isSelectMenu()) client.emit('interactionSelectMenuCreate', (interaction))
	if (interaction.isMessageComponent()) client.emit('interactionMessageComponentCreate', (interaction))
}