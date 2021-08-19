import type { Collection } from "collection-data";
import type {
  ApplicationCommandResolvable,
  ApplicationCommandData,
  ApplicationCommand,
  GuildResolvable,
  Collection as DJSCollection,
} from "discord.js";
import type { ShewenyClient } from "..";
import type { Command } from "../typescript/interfaces/interfaces";

/**
 * Manage slash-commands.
 * @class
 */
export class SlashHandler {
  private commands: Collection<string, any>;
  private client: ShewenyClient;

  /**
   * @param {ShewenyClient} client - The client
   */
  constructor(client: ShewenyClient) {
    if (!client)
      throw new ReferenceError("client must be provided for use slash-commands handler.");
    this.client = client;
    this.commands = client.commands!;
  }

  /**
   * Get an array of commands configuration for register it
   * @param {Collection<string, Command>} commands - The commands
   * @returns {ApplicationCommandData[]}
   */
  public getData(commands: Collection<string, Command>): ApplicationCommandData[] {
    const data: ApplicationCommandData[] = [];
    const commandsCategories: string[] = [];
    commands.forEach((c: Command) => commandsCategories.push(c.category));
    const categories = [...new Set(commandsCategories)];
    for (const category of categories) {
      const commandsCategory = [...commands].filter(([_, c]) => c.category === category);
      for (const c of commandsCategory) {
        if (c[1].subCommands?.length) {
          const commandOptions: any[] = [];
          c[1].subCommands.forEach((sc: any) => {
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
            name: c[1].name,
            description: c[1].description,
            options: commandOptions,
          });
        } else if (c[1].options && c[1].options.length) {
          const commandOptions: any = [];
          c[1].options.forEach((a: any) => {
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
        } else {
          // No commands args and no subcommands
          data.push({
            name: c[1].name,
            description: c[1].description,
          });
        }
      }
    }
    if (!data.length) {
      throw new Error("No commands found");
    }
    return data;
  }

  /**
   * Register commands
   * @param {Collection<string, Command>} commands - The commands to register
   * @param {string} [guildId] - The guild to register commands
   * @returns {Promise<DJSCollection<string, ApplicationCommand<{}>> | DJSCollection<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  public async registerCommands(
    commands = this.commands,
    guildId?: string
  ): Promise<
    | DJSCollection<string, ApplicationCommand<{}>>
    | DJSCollection<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    await this.client.awaitReady();

    const data = this.getData(commands);
    if (data && data.length > 0) {
      return guildId
        ? this.client.application?.commands.set(data, guildId)
        : this.client.application?.commands.set(data);
    }
    return undefined;
  }

  /**
   * Create a command
   * @param {Collection<string, Command>} commands - The commands to register
   * @param {string} [guildId] - The guild to register commands
   * @returns {Promise<DJSCollection<string, ApplicationCommand<{}>> | DJSCollection<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  public async createCommand(
    command: Command,
    guildId?: string
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  > {
    await this.client.awaitReady();
    const data: ApplicationCommandData = {
      name: command.name,
      description: command.description,
    };
    if (command.type) data.type = command.type as any;
    if (command.options) data.options = command.options;
    if (command.defaultPermission) data.defaultPermission = command.defaultPermission;
    return guildId
      ? this.client.application?.commands.create(data, guildId)
      : this.client.application?.commands.create(data);
  }

  /**
   * Edit a command
   * @param {ApplicationCommandResolvable} oldCommand - The commands to edit
   * @param {Command} newCommand - The commands to edit
   * @param {string} [guildId] - The guild to edit commands
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>} The application commands
   */
  async editCommand(
    oldCommand: ApplicationCommandResolvable,
    newCommand: Command,
    guildId?: string
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  > {
    await this.client.awaitReady();
    const data: ApplicationCommandData = {
      name: newCommand.name,
      description: newCommand.description,
    };
    if (newCommand.type) data.type = newCommand.type as any;
    if (newCommand.options) data.options = newCommand.options;
    if (newCommand.defaultPermission)
      data.defaultPermission = newCommand.defaultPermission;
    return guildId
      ? this.client.application?.commands.edit(oldCommand, data, guildId)
      : this.client.application?.commands.edit(oldCommand, data);
  }

  /**
   * Delete command
   * @param {ApplicationCommandResolvable} command - The commands to delete
   * @param {string} [guildId] - The guild to delete commands
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>} Delete function
   */
  async deleteCommand(
    command: ApplicationCommandResolvable,
    guildId?: string
  ): Promise<any> {
    await this.client.awaitReady();
    return guildId
      ? this.client.application?.commands.delete(command, guildId)
      : this.client.application?.commands.delete(command);
  }
  /**
   * Delete all commands
   * @param {string} [guildId] - The guild to delete commands
   * @returns {Promise<DJSCollection<string, ApplicationCommand<{}>> | DJSCollection<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  async deleteAllCommands(
    guildId?: string
  ): Promise<
    | DJSCollection<string, ApplicationCommand<{}>>
    | DJSCollection<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    return guildId
      ? this.client.application?.commands.set([], guildId)
      : this.client.application?.commands.set([]);
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
