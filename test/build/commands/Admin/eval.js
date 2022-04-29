"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const __1 = require("../../../../");
const util_1 = __importDefault(require("util"));
class PingCommand extends __1.Command {
    constructor(client) {
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
    async execute(interaction) {
        let evaled = interaction.options.getString('eval');
        try {
            if (interaction.options.get('options')?.value === 'a' || interaction.options.get('options')?.value === 'async') {
                evaled = `(async () => { ${interaction.options.getString('eval').trim()} })()`;
            }
            evaled = await eval(evaled);
            if (typeof evaled === 'object') {
                evaled = util_1.default.inspect(evaled, { depth: 0, showHidden: true });
            }
            else {
                evaled = String(evaled);
            }
        }
        catch (err) {
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
                interaction.channel.send(`\`\`\`js\n${evaled[0]}\`\`\``);
                interaction.channel.send(`\`\`\`js\n${evaled[1]}\`\`\``);
                interaction.channel.send(`\`\`\`js\n${evaled[2]}\`\`\``);
                return;
            }
            return evaled.forEach((message) => {
                interaction.reply(`\`\`\`js\n${message}\`\`\``);
                return;
            });
        }
        return interaction.reply(`\`\`\`js\n${evaled}\`\`\``);
    }
}
exports.PingCommand = PingCommand;
