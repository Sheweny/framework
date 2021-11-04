const { ApplicationCommand } = require("../../../../");

module.exports = class PingCommand extends ApplicationCommand {
  constructor(client) {
    super(
      client,
      {
        name: "ping",
        description: "Ping Pong",
        type: "CHAT_INPUT",
      },
      {
        category: "Misc",
      }
    );
  }

  async execute(interaction) {
    await interaction.reply({ content: "Pong" });
  }
};
