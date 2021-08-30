const { Command } = require("../../../");
const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
    });
  }
  execute(interaction) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton().setCustomId("primary").setLabel("Primary").setStyle("PRIMARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("secondary")
          .setLabel("Secondary")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton().setCustomId("success").setLabel("Success").setStyle("SUCCESS")
      )
      .addComponents(
        new MessageButton().setCustomId("danger").setLabel("Danger").setStyle("DANGER")
      );
    interaction.reply({ content: "Test the buttons", components: [row] });
  }
};
