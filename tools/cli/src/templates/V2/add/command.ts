import { IAddOptions } from "../../../typescript/interfaces/interfaces";

export default (options: IAddOptions) => {
  function command(): string {
    const importDjs = options.commandOptions!.type === "SLASH_COMMAND" ? "CommandInteraction" : "ContextMenuInteraction";

    return `${
      options.config!.template === "javascript"
        ? `const { Command } = require("sheweny");`
        : `import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ${importDjs} } from "discord.js";`
    }

${options.config!.template === "javascript" ? "module.exports =" : "export default"} class  extends Command {
  constructor(client${options.config!.template === "typescript" ? ": ShewenyClient" : ""}) {
    super(client, {
        name: "${options.addName.toLowerCase()}",
        description: "${options.commandOptions.description}",
        type: "${options.commandOptions.type}",
        ${options.commandOptions.category ? `category: "${options.commandOptions.category}",` : ""}
        ${options.commandOptions.cooldown ? `cooldown: ${options.commandOptions.cooldown},` : ""}
        ${options.commandOptions.only ? `channel: "${options.commandOptions.only}",` : ""}
      }
    );
  }

  async execute(interaction${options.config!.template === "typescript" ? `: ${importDjs}` : ""}) {
    await interaction.reply({ content: "Pong" });
  }
};
`;
  }
  return command();
};
