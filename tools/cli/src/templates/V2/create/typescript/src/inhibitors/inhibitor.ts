export default () => {
  return [
    `import { Inhibitor } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
  
export class BlackListInhibitor extends Inhibitor {
  constructor(client: ShewenyClient) {
    super(client, "blacklist", {
      type: ["ALL"],
    });
  }

  execute(interaction: CommandInteraction) {
    // Put a guild id
    return !["<guildId>"].includes(interaction.guildId!);
  }

  async onFailure(interaction: CommandInteraction) {
    await interaction.reply("Your guild is blacklisted.");
  }
};
`,
    "inhibitor.ts",
  ];
};
