import type { ApplicationCommandType, ApplicationCommandOptionData } from "discord.js";
import type { Command as Cmd } from "../../Command";
export interface ICommandMeta {
    description: string;
    guildOnly?: boolean;
    DMOnly?: boolean;
    type?: ApplicationCommandType;
    aliases?: string[];
    options?: Array<ApplicationCommandOptionData>;
    category: string;
    cooldown?: number;
    userPermissions?: string[];
    botPermissions?: string[];
    subCommands?: any[];
    defaultPermission?: boolean;
}
export interface ICommandInfosArgs {
    name: string;
    description: string;
    type: string;
    required: boolean;
}
export interface Command extends Cmd {
    before: Function;
    execute: Function;
}
