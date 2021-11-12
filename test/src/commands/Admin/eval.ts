import { Command } from '../../../../';
import type { ShewenyClient } from '../../../../';
import type { CommandInteraction } from 'discord.js';
import util from 'util';

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'eval',
      description: 'Eval a javascript code',
      type: 'SLASH_COMMAND',
      category: 'Admin',
      adminsOnly: true,
      options: [
        {
          name: 'eval',
          description: 'The javascript code.',
          type: 'STRING',
          required: true,
        },
        {
          name: 'options',
          description: 'The arguments for eval code.',
          type: 'STRING',
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    let evaled: any = interaction.options.getString('eval')!;
    try {
      if (interaction.options.get('options')?.value === 'a' || interaction.options.get('options')?.value === 'async') {
        evaled = `(async () => { ${interaction.options.getString('eval')!.trim()} })()`;
      }

      evaled = await eval(evaled!);
      if (typeof evaled === 'object') {
        evaled = util.inspect(evaled, { depth: 0, showHidden: true });
      } else {
        evaled = String(evaled);
      }
    } catch (err: any) {
      return interaction.reply(`\`\`\`js\n${err.stack}\`\`\``);
    }
    const token = this.client.token;
    evaled = evaled.replaceAll(token, 'no.');

    const fullLen = evaled.length;

    if (fullLen === 0) {
      return null;
    }
    if (fullLen > 2000) {
      evaled = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];
      if (evaled.length > 3) {
        interaction.channel!.send(`\`\`\`js\n${evaled[0]}\`\`\``);
        interaction.channel!.send(`\`\`\`js\n${evaled[1]}\`\`\``);
        interaction.channel!.send(`\`\`\`js\n${evaled[2]}\`\`\``);
        return;
      }
      return evaled.forEach((message: any) => {
        interaction.reply(`\`\`\`js\n${message}\`\`\``);
        return;
      });
    }
    return interaction.reply(`\`\`\`js\n${evaled}\`\`\``);
  }
}
