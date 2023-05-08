import { IAddOptions } from "../../../typescript/interfaces/interfaces";

export default (options: IAddOptions) => {
  return `${
    options.config!.template === "javascript"
      ? `const { Event } = require("sheweny");`
      : `import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";`
  }

${options.config!.template === "javascript" ? "module.exports =" : "export default"} class  extends Event {
  constructor(client${options.config!.template === "typescript" ? ": ShewenyClient" : ""}) {
    super(client, "${options.addName}", {
      description: "${options.eventOptions.description}",
      once: ${options.eventOptions.once},
    });
  }

  execute() {
    console.log("Event called !");
  }
};
`;
};
