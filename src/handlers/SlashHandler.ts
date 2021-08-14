import type { Collection } from 'collection-data'

export class SlashHandler {
	private commands: Collection<string, any>;
	constructor(commands: Collection<string, any>) {
		this.commands = commands
	}
	register() {
		const data: any = [];
		const commandsCategories: string[] = [];
		this.commands.forEach((c: any) => commandsCategories.push(c.category))
		const categories = [... new Set(commandsCategories)];
		for (const category of categories) {
			const commandsCategory = [...this.commands].filter(([_, c]) => c.category === category);
			for (const c of commandsCategory) {
				if (c[1].subCommands?.length) {
					const commandOptions: any = [];
					c[1].subCommands.forEach((sc: any) => {
						commandOptions.push({
							type: 'SUB_COMMAND',
							name: sc.name,
							description: sc.description,
							required: sc.required,
							choices: sc.choices,
							options: sc.options
						})
					})
					data.push({
						type: 'SUB_COMMAND_GROUP',
						name: c[1].name,
						description: c[1].description,
						options: commandOptions
					})
				}
				else if (c[1].options && c[1].options.length) {
					const commandOptions: any = [];
					c[1].options.forEach((a: any) => {
						commandOptions.push({
							type: 'STRING',
							name: a.name,
							description: a.description,
							required: a.required,
							choices: a.choices,
							options: a.options
						})
					})
					data.push({
						name: c[1].name,
						description: c[1].description,
						options: commandOptions
					})
				}
				else {
					// No commands args and no subcommands
					data.push({
						name: c[1].name,
						description: c[1].description,
					})
				}

			}
		}
		return data;
	}
}

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
