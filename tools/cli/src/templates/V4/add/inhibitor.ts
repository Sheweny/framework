import { IAddOptions } from "../../../typescript/interfaces/interfaces";

export default (options: IAddOptions) => {
  return `${
    options.config!.template === "javascript"
      ? `const { Inhibitor } = require("sheweny");`
      : `import { Inhibitor, type ShewenyClient, type BaseStructure } from "sheweny";
import type { Interaction } from "discord.js";`
  }
${options.config!.template === "javascript" ? "module.exports =" : "export default"} class extends Inhibitor {
  constructor(client${options.config!.template === "typescript" ? ": ShewenyClient" : ""}) {
    super(client, "${options.addName}", {
      type: ${options.inhibitorOptions.type ? JSON.stringify(options.inhibitorOptions.type) : ["ALL"]},
    });
  }

  execute(structure: BaseStructure, interaction${options.config!.template === "typescript" ? `: Interaction` : ""}) {
    return !["877090306103840778"].includes(interaction.guildId!);
  }

  async onFailure(structure: BaseStructure, interaction${options.config!.template === "typescript" ? `: Interaction` : ""}) {
    await interaction.reply("Your guild is blacklisted.");
  }
};
`;
};
