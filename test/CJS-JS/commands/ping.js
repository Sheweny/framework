const { Command } = require('sheweny');

module.exports = class LimitCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'limit',
      description: "Changer la limite d'utilisateurs du salon animation",
      type: 'SLASH_COMMAND',
      category: 'Animation',
      options: [
        {
          name: 'limite',
          description: "Limite d'utilisateurs",
          type: 'NUMBER',
          autocomplete: true,
          required: true,
        },
      ],
    });
  }

  async execute(interaction) {
    // Code
  }
};
