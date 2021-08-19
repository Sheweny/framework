import type { Message } from "discord.js";
import type { ShewenyClient } from "..";
export default function run(client: ShewenyClient, message: Message): Promise<boolean>;
