import { AutocompleteInteraction } from 'discord.js';
import type { ShewenyClient } from '..';
import type { CommandInteraction, ContextMenuInteraction } from 'discord.js';
export default function run(client: ShewenyClient, interaction: CommandInteraction | ContextMenuInteraction | AutocompleteInteraction): Promise<any>;
