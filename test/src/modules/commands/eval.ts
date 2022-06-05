import util from 'util';
import { Command, ShewenyClient } from 'sheweny';
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';

export class EvalCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'eval',
      description: 'Eval a javascript code',
      type: 'SLASH_COMMAND',
      category: 'Admin',
      options: [
        {
          name: 'code',
          description: 'The code to eval',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
      adminsOnly: true,
    });
  }
  async execute(interaction: CommandInteraction) {
    let evaled: string = interaction.options.get('code', true)!.value as string;

    try {
      evaled = await eval(evaled);
      if (typeof evaled === 'object') evaled = util.inspect(evaled, { depth: 0, showHidden: true });
      else evaled = String(evaled);
    } catch (err: any) {
      return interaction.reply(`\`\`\`js\n${err.stack}\`\`\``);
    }

    const fullLen = evaled.length;

    if (fullLen === 0) {
      return null;
    }
    if (fullLen > 2000) {
      const evaledMatch = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];

      if (evaledMatch.length > 3) {
        interaction.channel!.send({
          content: `\`\`\`js\n${evaledMatch[0]}\`\`\``,
        });
        interaction.channel!.send({
          content: `\`\`\`js\n${evaledMatch[1]}\`\`\``,
        });
        interaction.channel!.send({
          content: `\`\`\`js\n${evaledMatch[2]}\`\`\``,
        });
        return;
      }
      return evaledMatch.forEach((message: any) => {
        interaction.reply(`\`\`\`js\n${message}\`\`\``);
        return;
      });
    }
    return interaction.reply({ content: `\`\`\`js\n${evaled}\`\`\`` });
  }
}
