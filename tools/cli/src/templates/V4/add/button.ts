import { IAddOptions } from "../../../typescript/interfaces/interfaces";

export default (options: IAddOptions) => {
  return `${
    options.config!.template === "javascript"
      ? `const { Button } = require("sheweny");`
      : `import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction } from "discord.js";`
  }

${options.config!.template === "javascript" ? "module.exports =" : "export default"} class  extends Button {
  constructor(client${options.config!.template === "typescript" ? ": ShewenyClient" : ""}) {
    super(client, ["customId"]);
  }

  async execute(interaction${options.config!.template === "typescript" ? `: ButtonInteraction` : ""}) {
    await interaction.reply({ content: "Test" });
  }
};`;
};
