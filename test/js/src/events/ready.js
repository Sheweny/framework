const { Event } = require("../../../..");

module.exports = class ReadyEvent extends Event {
  constructor(client) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
    });
  }

  execute() {
    console.log(`${this.client.user.tag} is logged in`);
  }
};
