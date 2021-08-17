"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashHandler = void 0;
class SlashHandler {
    constructor(client) {
        if (!client.commands)
            throw new Error("No commands found. Please use CommandsHandler.loadAll() for load commands.");
        this.client = client;
        this.commands = client.commands;
    }
    getData(commands) {
        const data = [];
        const commandsCategories = [];
        commands.forEach((c) => commandsCategories.push(c.category));
        const categories = [...new Set(commandsCategories)];
        for (const category of categories) {
            const commandsCategory = [...commands].filter(([_, c]) => c.category === category);
            for (const c of commandsCategory) {
                if (c[1].subCommands?.length) {
                    const commandOptions = [];
                    c[1].subCommands.forEach((sc) => {
                        commandOptions.push({
                            type: "SUB_COMMAND",
                            name: sc.name,
                            description: sc.description,
                            required: sc.required,
                            choices: sc.choices,
                            options: sc.options,
                        });
                    });
                    data.push({
                        type: "SUB_COMMAND_GROUP",
                        name: c[1].name,
                        description: c[1].description,
                        options: commandOptions,
                    });
                }
                else if (c[1].options && c[1].options.length) {
                    const commandOptions = [];
                    c[1].options.forEach((a) => {
                        commandOptions.push({
                            type: "STRING",
                            name: a.name,
                            description: a.description,
                            required: a.required,
                            choices: a.choices,
                            options: a.options,
                        });
                    });
                    data.push({
                        name: c[1].name,
                        description: c[1].description,
                        options: commandOptions,
                    });
                }
                else {
                    // No commands args and no subcommands
                    data.push({
                        name: c[1].name,
                        description: c[1].description,
                    });
                }
            }
        }
        return data;
    }
    async registerCommands(commands = this.commands, guildId) {
        await this.client.awaitReady();
        const data = this.getData(commands);
        if (data && data.length > 0) {
            if (guildId) {
                return await this.client.application?.commands.set(data, guildId);
            }
            return await this.client.application?.commands.set(data);
        }
        return null;
    }
    async createCommand(command, guildId) {
        await this.client.awaitReady();
        const data = {
            name: command.name,
            description: command.description,
        };
        if (command.type)
            data.type = command.type;
        if (command.options)
            data.options = command.options;
        if (command.defaultPermission)
            data.defaultPermission = command.defaultPermission;
        if (guildId)
            return this.client.application?.commands.create(data, guildId);
        return this.client.application?.commands.create(data);
    }
    async editCommand(oldCmd, newCmd, guildId) {
        await this.client.awaitReady();
        const data = {
            name: newCmd.name,
            description: newCmd.description,
        };
        if (newCmd.type)
            data.type = newCmd.type;
        if (newCmd.options)
            data.options = newCmd.options;
        if (newCmd.defaultPermission)
            data.defaultPermission = newCmd.defaultPermission;
        if (guildId)
            return this.client.application?.commands.edit(oldCmd, data, guildId);
        return this.client.application?.commands.edit(oldCmd, data);
    }
    async deleteCommand(oldCmd, guildId) {
        await this.client.awaitReady();
        if (guildId)
            return this.client.application?.commands.delete(oldCmd, guildId);
        return this.client.application?.commands.delete(oldCmd);
    }
    async deleteAllCommands(guildId) {
        if (guildId)
            return this.client.application?.commands.set([], guildId);
        return this.client.application?.commands.set([]);
    }
}
exports.SlashHandler = SlashHandler;
// Sub command group
/*
    const data: any = [];
    const commandsCategories: string[] = [];
    this.spiritus.commands.forEach((c: any) => commandsCategories.push(c.category))
    const categories = [... new Set(commandsCategories)];
    for (const category of categories) {
        const commandsCategory = [...this.spiritus.commands].filter(([_, c]) => c.category === category);
        const commandsData: any = [];
        commandsCategory.forEach((c: any) => {
            commandsData.push({
                type: 'SUB_COMMAND',
                name: c[1].name,
                description: c[1].description,
                required: c[1].required,
                choices: c[1].choices,
                options: c[1].options
            })
        })
        data.push({
            type: 'SUB_COMMAND_GROUP',
            name: category.toLocaleLowerCase(),
            description: `The commands of category ${category.toLocaleLowerCase()}.`,
            options: commandsData
        })
    }
    this.spiritus.client.application!.commands.set(data, '809702809196560405');
*/
