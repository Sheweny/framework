const { Button } = require("../../../../../");

module.exports = class ButtonTest extends Button {
  constructor(client) {
    super(client, ["primaryId", "secondaryId", "successId", "dangerId"]);
  }

  async execute(button) {
    switch (button.customId) {
      case "primaryId":
        await button.reply({ content: "You have clicked on **primary** button !" });
        break;
      case "secondaryId":
        awaitnbutton.reply({ content: "You have clicked on **secondary** button !" });
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
