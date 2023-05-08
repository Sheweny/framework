export default () => {
  return [
    `import { Inhibitor } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Interaction } from "discord.js";
  
export class BlackListInhibitor extends Inhibitor {
  constructor(client: ShewenyClient) {
    super(client, "blacklist", {
      type: ["ALL"],
    });
  }

  execute(client: ShewenyClient, interaction: Interaction) {
    // Put a guild id
    return !["<guildId>"].includes(interaction.guildId!);
  }

  async onFailure(client:ShewenyClient, interaction: Interaction) {
    await interaction.reply("Your guild is blacklisted.");
  }
};
`,
    "inhibitor.ts",
  ];
};
