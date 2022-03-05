import { Modal, ShewenyClient } from '../../../../';
import type { ModalSubmitInteraction } from 'discord.js';

export class Mod extends Modal {
  constructor(client: ShewenyClient) {
    super(client, ['AwesomeForm']);
  }
  async execute(modal: ModalSubmitInteraction) {
    modal.reply('Modal received !');
  }
}
