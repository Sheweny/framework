import { Collection } from "collection-data";
import { join } from "path";
import type {
  Collection as CollectionDjs,
  ApplicationCommand,
  ApplicationCommandData,
  ApplicationCommandResolvable,
  GuildResolvable,
  ApplicationCommandPermissionData,
  GuildApplicationCommandPermissionData,
  ApplicationCommandType,
} from "discord.js";
import { EventEmitter } from "events";
import { readDirAndPush } from "../utils/readDirFiles";
import type { ShewenyClient, Command } from "..";

interface CommandsManagerOptions {
  guildId?: string;
  prefix?: string;
  applicationPermissions?: boolean;
}

/**
 * Manager for Commands
 * @extends {EventEmitter}
 */
export class CommandsManager extends EventEmitter {
  /**
   * Client framework
   * @type {ShewenyClient}
   */
  private client: ShewenyClient;

  /**
   * Directory of the commands folder
   * @type {string}
   */
  public directory: string;

  /**
   * ID of the guild where are set Applications Commands
   * @type {string | undefined}
   */
  public guildId?: string;

  /**
   * Prefix for the Message Commands
   * @type {string | undefined}
   */
  public prefix?: string;

  /**
   * If the applications commands are disabled according to the `userPermissions` array
   * @type {boolean | undefined}
   */
  public applicationPermissions?: boolean;

  /**
   * Collection of the commands
   * @type {Collection<string, Command> | undefined}
   */
  public commands?: Collection<string, Command>;

  /**
   * Constructor to manage commands
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the commands folder
   * @param {boolean} [loadAll] If the commands are loaded during bot launch
   * @param {CommandsManagerOptions} [options] Options of the commands manager
   */
  constructor(
    client: ShewenyClient,
    directory: string,
    loadAll?: boolean,
    options?: CommandsManagerOptions
  ) {
    super();

    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;
    this.guildId = options?.guildId;
    this.prefix = options?.prefix;
    this.applicationPermissions = options?.applicationPermissions || false;

    if (loadAll) this.loadAndRegisterAll();
    client.handlers.commands = this;
  }

  /**
   * Load all commands in collection
   * @returns {Promise<Collection<string, Command>>}
   */
  public async loadAll(): Promise<Collection<string, Command>> {
    const commands: Collection<string, Command> = new Collection();
    const baseDir = join(require.main!.path, this.directory);
    const cmdsPath = await readDirAndPush(baseDir);
    for (const cmdPath of cmdsPath) {
      const cmdImport = await import(cmdPath);
      const key = Object.keys(cmdImport)[0];
      const Command = cmdImport[key];
      if (!Command) continue;
      const instance: Command = new Command(this.client);
      if (!instance.name) continue;

      instance.path = cmdPath;
      commands.set(instance.name, instance);
    }

    this.client.collections.commands = commands;
    this.commands = commands;
    return commands;
  }

  /**
   * Load all and Register Application commands
   * @returns {Promise<void>}
   */
  public async loadAndRegisterAll(): Promise<void> {
    const commands = await this.loadAll();
    await this.registerAllApplicationCommands(commands);
  }

  /**
   * Rename command type to the type of Application command
   * @param {"SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"} type Type of command
   * @returns {ApplicationCommandType | undefined}
   */
  private renameCommandType(
    type: "SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"
  ): ApplicationCommandType | undefined {
    if (type === "SLASH_COMMAND") return "CHAT_INPUT";
    if (type === "CONTEXT_MENU_MESSAGE") return "MESSAGE";
    if (type === "CONTEXT_MENU_USER") return "USER";
    return undefined;
  }

  /**
   * Get data of Application Command
   * @param {Collection<string, Command> | Command | undefined} [commands] The command(s) to obtain their data
   * @returns {ApplicationCommandData[] | ApplicationCommandData | undefined}
   */
  public getData(
    commands: Collection<string, Command> | Command | undefined = this.commands
  ): ApplicationCommandData[] | ApplicationCommandData | undefined {
    if (!commands) throw new Error("Commands not found");

    if (commands instanceof Collection) {
      const data: any[] = [];
      for (let [, cmd] of commands) {
        if (cmd.type === "MESSAGE_COMMAND") continue;

        const newType = this.renameCommandType(cmd.type);
        if (!newType) continue;

        if (cmd.type === "SLASH_COMMAND") {
          data.push({
            type: newType,
            name: cmd.name,
            description: cmd.description,
            options: cmd.options,
            defaultPermission:
              this.applicationPermissions &&
              this.guildId &&
              cmd.userPermissions.length > 0
                ? false
                : cmd.defaultPermission,
          });
        } else if (
          cmd.type === "CONTEXT_MENU_MESSAGE" ||
          cmd.type === "CONTEXT_MENU_USER"
        ) {
          data.push({
            type: newType,
            name: cmd.name,
            defaultPermission:
              this.applicationPermissions &&
              this.guildId &&
              cmd.userPermissions.length > 0
                ? false
                : cmd.defaultPermission,
          });
        }
      }

      return data as ApplicationCommandData[];
    } else {
      if (commands.type === "MESSAGE_COMMAND") return undefined;

      const newType = this.renameCommandType(commands.type);
      if (!newType) return undefined;

      if (commands.type === "SLASH_COMMAND") {
        return {
          type: newType,
          name: commands.name,
          description: commands.description,
          options: commands.options,
          defaultPermission:
            this.applicationPermissions &&
            this.guildId &&
            commands.userPermissions.length > 0
              ? false
              : commands.defaultPermission,
        } as ApplicationCommandData;
      } else if (
        commands.type === "CONTEXT_MENU_MESSAGE" ||
        commands.type === "CONTEXT_MENU_USER"
      ) {
        return {
          type: newType,
          name: commands.name,
          defaultPermission:
            this.applicationPermissions &&
            this.guildId &&
            commands.userPermissions.length > 0
              ? false
              : commands.defaultPermission,
        } as ApplicationCommandData;
      }
    }
  }

  /**
   * Set all application commands from the collection of commands in the client application
   * @param {Collection<string, Command> | undefined} [commands] Collection of the commands
   * @returns {Promise<CollectionDjs<string, ApplicationCommand<{}>> | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
   */
  public async registerAllApplicationCommands(
    commands: Collection<string, Command> | undefined = this.commands
  ): Promise<
    | CollectionDjs<string, ApplicationCommand<{}>>
    | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    if (!commands) throw new Error("Commands not found");
    const data = this.getData();

    await this.client.awaitReady();

    if (data instanceof Array && data.length > 0) {
      const cmds = this.guildId
        ? await this.client.application?.commands.set(data, this.guildId)
        : await this.client.application?.commands.set(data);

      if (this.applicationPermissions) await this.registerPermissions(cmds);

      return cmds;
    }
    return undefined;
  }

  /**
   * Set permissions for each commands in guild
   * @param {CollectionDjs<string, ApplicationCommand<{}>> | undefined} [applicationCommands] Commands coming from the client's application
   * @param {Collection<string, Command> | undefined} [commandsCollection] Commands coming from the collection of the commands
   * @param {string | undefined} [guildId] Guild ID where permissions will be set
   * @returns {Promise<void>}
   */
  public async registerPermissions(
    applicationCommands: CollectionDjs<string, ApplicationCommand<{}>> | undefined = this
      .client.application?.commands.cache,
    commandsCollection: Collection<string, Command> | undefined = this.commands,
    guildId: string | undefined = this.guildId
  ): Promise<void> {
    if (!applicationCommands)
      throw new ReferenceError("Commands of application must be provided");
    if (!commandsCollection)
      throw new ReferenceError("Commands of client must be provided");

    if (guildId) {
      const guild = this.client.guilds.cache.get(guildId);
      const getRoles = (command: Command) => {
        if (command.userPermissions?.length === 0) return null;
        return guild?.roles.cache.filter((r) =>
          r.permissions.has(command.userPermissions)
        );
      };

      const fullPermissions: GuildApplicationCommandPermissionData[] = [];
      for (const [id, appCommand] of applicationCommands) {
        const roles = getRoles(commandsCollection.get(appCommand.name)!);
        const rolesPermissions: ApplicationCommandPermissionData[] = [];
        const usersPermissions: ApplicationCommandPermissionData[] = [];

        if (roles && roles.size)
          for (const [id, role] of roles!) {
            rolesPermissions.push({ id: role.id, type: "ROLE", permission: true });
          }
        if (this.client.admins && this.client.admins.length)
          for (const userId of this.client.admins) {
            usersPermissions.push({ id: userId, type: "USER", permission: true });
          }
        fullPermissions.push({
          id: appCommand.id,
          permissions: [...rolesPermissions, ...usersPermissions],
        });
      }

      await guild?.commands.permissions.set({ fullPermissions });
    }
  }

  /**
   * Create a command in the client's application commands
   * @param {Command} command Command to create
   * @param {string | undefined} [guildId] Guild ID where the order will be created
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
   */
  public async createCommand(
    command: Command,
    guildId?: string
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  > {
    if (!command) throw new Error("Command not found");

    const data = this.getData(command) as ApplicationCommandData;
    if (!data) return undefined;

    return guildId
      ? this.client.application?.commands.create(data, guildId)
      : this.client.application?.commands.create(data);
  }

  /**
   * Edit an command with a new command in the client's application commands
   * @param {ApplicationCommandResolvable} oldCommand Command edited
   * @param {Command} newCommand The new command that will take the place of the old one
   * @param {string | undefined} [guildId] Guild ID where the order will be edited
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
   */
  public async editCommand(
    oldCommand: ApplicationCommandResolvable,
    newCommand: Command,
    guildId?: string
  ): Promise<
    ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined
  > {
    if (!oldCommand) throw new Error("Old Command not found");
    if (!newCommand) throw new Error("New Command not found");

    const data = this.getData(newCommand) as ApplicationCommandData;
    if (!data) return undefined;

    return guildId
      ? this.client.application?.commands.edit(oldCommand, data, guildId)
      : this.client.application?.commands.edit(oldCommand, data);
  }

  /**
   * Removes an command from the client's application commands
   * @param {ApplicationCommandResolvable} command Command deleted
   * @param {string | undefined} [guildId] Guild ID where the command will be deleted
   * @returns {Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined>}
   */
  public async deleteCommand(
    command: ApplicationCommandResolvable,
    guildId?: string
  ): Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined> {
    if (!command) throw new Error("Command not found");

    return guildId
      ? this.client.application?.commands.delete(command, guildId)
      : this.client.application?.commands.delete(command);
  }

  /**
   * Delete all commands from the client's application commands
   * @param {string | undefined} [guildId] Guild ID where all commands will be deleted
   * @returns {Promise<CollectionDjs<string, ApplicationCommand<{}>> | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
   */
  public async deleteAllCommands(
    guildId?: string
  ): Promise<
    | CollectionDjs<string, ApplicationCommand<{}>>
    | CollectionDjs<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    return guildId
      ? this.client.application?.commands.set([], guildId)
      : this.client.application?.commands.set([]);
  }
}
