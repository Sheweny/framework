'use strict';
const { Inhibitor } = require('sheweny');
module.exports = class cmdClaimInhibitor extends Inhibitor {
  constructor(client) {
    super(client, /cmd_claim-[A-Za-z]{1,}/, {
      type: ['BUTTON'],
    });
  }
  execute(client, interaction) {
    // if(!interaction.customId.startsWith("cmd_claim-")) return true;
    console.log('-----------------------------------------');
    console.log(interaction.customId);
  }
  async onFailure(client, interaction) {
    await interaction.reply('Your guild is blacklisted.');
  }
};
