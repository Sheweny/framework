"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvalCommand = void 0;
const util_1 = __importDefault(require("util"));
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
class EvalCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Eval a javascript code',
            type: 'SLASH_COMMAND',
            category: 'Admin',
            options: [
                {
                    name: 'code',
                    description: 'The code to eval',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
            adminsOnly: true,
        });
    }
    async execute(interaction) {
        let evaled = interaction.options.get('code', true).value;
        try {
            evaled = await eval(evaled);
            if (typeof evaled === 'object')
                evaled = util_1.default.inspect(evaled, { depth: 0, showHidden: true });
            else
                evaled = String(evaled);
        }
        catch (err) {
            return interaction.reply(`\`\`\`js\n${err.stack}\`\`\``);
        }
        const fullLen = evaled.length;
        if (fullLen === 0) {
            return null;
        }
        if (fullLen > 2000) {
            const evaledMatch = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];
            if (evaledMatch.length > 3) {
                interaction.channel.send({
                    content: `\`\`\`js\n${evaledMatch[0]}\`\`\``,
                });
                interaction.channel.send({
                    content: `\`\`\`js\n${evaledMatch[1]}\`\`\``,
                });
                interaction.channel.send({
                    content: `\`\`\`js\n${evaledMatch[2]}\`\`\``,
                });
                return;
            }
            return evaledMatch.forEach((message) => {
                interaction.reply(`\`\`\`js\n${message}\`\`\``);
                return;
            });
        }
        return interaction.reply({ content: `\`\`\`js\n${evaled}\`\`\`` });
    }
}
exports.EvalCommand = EvalCommand;
