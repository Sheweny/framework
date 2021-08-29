const { Inhibitor } = require("../../../../");

module.exports = class BlackListInhibitor extends Inhibitor {
  constructor(client) {
    super(client, "blacklist", {
      type: ["ALL"],
    });
  }

  execute(client, interaction) {
    // Put a guild id
    return !["<guildId>"].includes(interaction.guildId);
  }

  async onFailure(client, interaction) {
    await interaction.reply("Your guild is blacklisted.");
  }
};
