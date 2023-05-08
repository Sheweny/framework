import { IAddOptions } from "../../../typescript/interfaces/interfaces";

export default (options: IAddOptions) => {
  return `${
    options.config!.template === "javascript"
      ? `const { Inhibitor } = require("sheweny");`
      : `import { Inhibitor } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";`
  }
${options.config!.template === "javascript" ? "module.exports =" : "export default"} class extends Inhibitor {
  constructor(client${options.config!.template === "typescript" ? ": ShewenyClient" : ""}) {
    super(client, "${options.addName}", {
      type: ${options.inhibitorOptions.type ? JSON.stringify(options.inhibitorOptions.type) : ["ALL"]},
    });
  }

  execute(interaction${options.config!.template === "typescript" ? `: CommandInteraction` : ""}) {
    return !["877090306103840778"].includes(interaction.guildId!);
  }

  async onFailure(interaction${options.config!.template === "typescript" ? `: CommandInteraction` : ""}) {
    await interaction.reply("Your guild is blacklisted.");
  }
};
`;
};
