export default () => {
  return [
    `import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction } from "discord.js";

export class ButtonComponent extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["primaryId", "secondaryId", "successId", "dangerId"]);
  }
  
  async execute(button: ButtonInteraction) {
    switch (button.customId) {
      case "primaryId":
        await button.reply({ content: "You have clicked on **primary** button !" });
        break;
      case "secondaryId":
        await button.reply({ content: "You have clicked on **secondary** button !" });
        break;
      case "successId":
        await button.reply({ content: "You have clicked on **success** button !" });
        break;
      case "dangerId":
        await button.reply({ content: "You have clicked on **danger** button !" });
        break;
    }
  }
};
`,
    "button.ts",
  ];
};
