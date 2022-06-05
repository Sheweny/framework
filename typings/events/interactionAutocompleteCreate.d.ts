import { AutocompleteInteraction } from 'discord.js';
import type { ShewenyClient } from '../client/Client.js';
import type { CommandInteraction, ContextMenuCommandInteraction } from 'discord.js';
export default function run(client: ShewenyClient, interaction: CommandInteraction | ContextMenuCommandInteraction | AutocompleteInteraction): Promise<unknown>;
