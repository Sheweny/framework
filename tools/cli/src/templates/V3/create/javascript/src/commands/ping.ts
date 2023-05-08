export default () => {
  return [
    `const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Ping Pong",
      type: "SLASH_COMMAND",
      category: "Misc",
      cooldown: 3,
    });
  }

  async execute(interaction) {
    await interaction.reply({ content: "Pong" });
  }
};

`,
    "ping.js",
  ];
};
