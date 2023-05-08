import { IAddOptions } from "../../../typescript/interfaces/interfaces";

export default (options: IAddOptions) => {
  return `${
    options.config!.template === "javascript"
      ? `const { SelectMenu } = require("sheweny");`
      : `import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { SelectMenuInteraction } from "discord.js";`
  }

${options.config!.template === "javascript" ? "module.exports =" : "export default"} class  extends SelectMenu {
  constructor(client${options.config!.template === "typescript" ? ": ShewenyClient" : ""}) {
    super(client, ["customId"]);
  }

  async execute(interaction${options.config!.template === "typescript" ? `: SelectMenuInteraction` : ""}) {
    await interaction.reply({ content: "Select menu work !" });
  }
};
`;
};
