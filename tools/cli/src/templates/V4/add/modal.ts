import { IAddOptions } from "../../../typescript/interfaces/interfaces";

export default (options: IAddOptions) => {
  return `${
    options.config!.template === "javascript"
      ? `const { Modal } = require("sheweny");`
      : `import { Modal, type ShewenyClient } from "sheweny";
import type { ModalSubmitInteraction } from "discord.js";`
  }

${options.config!.template === "javascript" ? "module.exports =" : "export default"} class  extends Modal {
  constructor(client${options.config!.template === "typescript" ? ": ShewenyClient" : ""}) {
    super(client, ["customId"]);
  }

  async execute(interaction${options.config!.template === "typescript" ? `: ModalSubmitInteraction` : ""}) {
    await interaction.reply({ content: "Test" });
  }
};`;
};
