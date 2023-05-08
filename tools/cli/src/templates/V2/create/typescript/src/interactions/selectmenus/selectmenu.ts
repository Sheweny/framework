export default () => {
  return [
    `import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { SelectMenuInteraction } from "discord.js";
  
export class SelectComponent extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ["selectId"]);
  }
  
  async execute(selectMenu: SelectMenuInteraction) {
    switch (selectMenu.values[0]) {
      case "first_option":
        await selectMenu.reply({ content: "You have choose **first** option !" });
        break;
      case "second_option":
        await selectMenu.reply({ content: "You have choose **second** option !" });
        break;
    }
  }
};
`,
    "selectmenu.ts",
  ];
};
