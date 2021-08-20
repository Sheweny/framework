import { Collection } from "collection-data";
import {
  ApplicationCommandResolvable,
  ApplicationCommandData,
  ApplicationCommand as ApplicationCommandDjs,
  GuildResolvable,
  Collection as CollectionDjs,
  Client,
} from "discord.js";
import { ShewenyClient } from "../ShewenyClient";
import { ApplicationCommand } from "../structures";

/**
 * Create Application Command handler
 * @class Application Command Handler
 */
export class ApplicationCommandHandler {
  private applicationCommands?: Collection<string, ApplicationCommand>;
  private client: ShewenyClient | Client;

  /**
   * @constructor
   * @param {ShewenyClient | Client} client - The client
   */
  constructor(client: ShewenyClient | Client) {
    if (!client)
      throw new ReferenceError("Client must be provided for use Application handler.");
    this.client = client;
    this.applicationCommands =
      client instanceof ShewenyClient ? client.applicationCommands! : undefined;
  }

  /**
   * Get an array of application commands configuration for register it
   * @public
   * @param {Collection<string, ApplicationCommand>} applicationCommands - The application commands
   * @returns {ApplicationCommandData[]}
   */
  public getData(
    applicationCommands: Collection<string, ApplicationCommand>
  ): ApplicationCommandData[] {
    const data: ApplicationCommandData[] = [];
    applicationCommands.forEach((e) => data.push(e.data));

    return data;
  }

  /**
   * Register application commands
   * @public
   * @async
   * @param {Collection<string, ApplicationCommand>} applicationCommands - The application commands to register
   * @param {string} [guildId] - The guild to register context menus
   * @returns {Promise<CollectionDjs<string, ApplicationCommand<{}>> | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  public async registerCommands(
    applicationCommands: Collection<string, ApplicationCommand> | undefined = this
      .applicationCommands,
    guildId?: string
  ): Promise<
    | CollectionDjs<string, ApplicationCommandDjs<{}>>
    | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable }>>
    | undefined
  > {
    if (this.client instanceof ShewenyClient) await this.client.awaitReady();
    if (!applicationCommands)
      throw new ReferenceError(
        "ApplicationCommand Collection must be provided for use Application Command handler."
      );

    const data = this.getData(applicationCommands);
    if (data && data.length > 0) {
      return guildId
        ? this.client.application?.commands.set(data, guildId)
        : this.client.application?.commands.set(data);
    }
    return undefined;
  }

  /**
   * Create a Application Command
   * @public
   * @async
   * @param {Command} applicationCommand - The application command to register
   * @param {string} [guildId] - The guild to register command
   * @returns {Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  public async createCommand(
    applicationCommand: ApplicationCommand,
    guildId?: string
  ): Promise<
    | ApplicationCommandDjs<{}>
    | ApplicationCommandDjs<{ guild: GuildResolvable }>
    | undefined
  > {
    if (this.client instanceof ShewenyClient) await this.client.awaitReady();

    return guildId
      ? this.client.application?.commands.create(applicationCommand.data, guildId)
      : this.client.application?.commands.create(applicationCommand.data);
  }

  /**
   * Edit a application command
   * @public
   * @async
   * @param {ApplicationCommandResolvable} oldCommand - The command to edit
   * @param {ApplicationCommand} newCommand - The new application command to edit
   * @param {string} [guildId] - The guild to edit command
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>} The application commands
   */
  public async editCommand(
    oldCommand: ApplicationCommandResolvable,
    newCommand: ApplicationCommand,
    guildId?: string
  ): Promise<
    | ApplicationCommandDjs<{}>
    | ApplicationCommandDjs<{ guild: GuildResolvable }>
    | undefined
  > {
    if (this.client instanceof ShewenyClient) await this.client.awaitReady();

    return guildId
      ? this.client.application?.commands.edit(oldCommand, newCommand.data, guildId)
      : this.client.application?.commands.edit(oldCommand, newCommand.data);
  }

  /**
   * Delete application command
   * @public
   * @async
   * @param {ApplicationCommandResolvable} command - The command to delete
   * @param {string} [guildId] - The guild to delete command
   * @returns {Promise<ApplicationCommandDjs<{}> | ApplicationCommandDjs<{ guild: GuildResolvable }> | undefined>} Delete function
   */
  public async deleteCommand(
    command: ApplicationCommandResolvable,
    guildId?: string
  ): Promise<ApplicationCommandDjs<{ guild: GuildResolvable }> | null | undefined> {
    if (this.client instanceof ShewenyClient) await this.client.awaitReady();
    return guildId
      ? this.client.application?.commands.delete(command, guildId)
      : this.client.application?.commands.delete(command);
  }

  /**
   * Delete all application commands
   * @public
   * @async
   * @param {string} [guildId] - The guild to delete commands
   * @returns {Promise<CollectionDjs<string, ApplicationCommandDjs<{}>> | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable; }>> | undefined>} The application commands
   */
  public async deleteAllCommands(
    guildId?: string
  ): Promise<
    | CollectionDjs<string, ApplicationCommandDjs<{}>>
    | CollectionDjs<string, ApplicationCommandDjs<{ guild: GuildResolvable }>>
    | undefined
  > {
    return guildId
      ? this.client.application?.commands.set([], guildId)
      : this.client.application?.commands.set([]);
  }
}
