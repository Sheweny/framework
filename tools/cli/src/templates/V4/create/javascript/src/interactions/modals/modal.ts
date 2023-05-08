export default () => {
  return [
    `const { Modal } = require("sheweny");

module.exports = class ModalComponent extends Modal {
  constructor(client) {
    super(client, ["modal-id"]);
  }
  
  async execute(modal) {
    modal.reply("Modal received.");
  }
};
`,
    "modal.js",
  ];
};
