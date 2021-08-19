import type { CommandInteraction } from "discord.js";
import type { ShewenyClient } from "../index";
interface CommandInteractionExtend extends CommandInteraction {
    subCommand: string | null;
}
export default function run(client: ShewenyClient, interaction: CommandInteractionExtend): Promise<boolean>;
export {};