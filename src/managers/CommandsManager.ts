import { Collection, EnumResolvers } from 'discord.js';
import { BaseManager } from '.';
import { loadFiles } from '../utils/loadFiles';
import { COMMAND_TYPE } from '../constants/constants';
import { ShewenyInformation } from '../helpers';
import type {
  ApplicationCommand,
  ApplicationCommandData,
  ApplicationCommandResolvable,
  GuildResolvable,
  ApplicationCommandPermissionData,
  GuildApplicationCommandPermissionData,
  ApplicationCommandType,
  Snowflake,
} from 'discord.js';
import type { ShewenyClient, Command } from '..';
import type { CommandsManagerOptions, CommandsManagerDefaultOptions } from '../typescript/interfaces';

/**
 * Manager for Commands
 * @extends {EventEmitter}
 */
export class CommandsManager extends BaseManager {
  /**
   * If the applications commands are disabled according to the `userPermissions` array
   * @type {boolean | undefined}
   */
  public applicationPermissions?: boolean;

  /**
   * Register application commands
   * @type {boolean}
   */
  public autoRegisterApplicationCommands: boolean;

  /**
   * Collection of the commands
   * @type {Collection<string, Command> | undefined}
   */
  public commands?: Collection<string, Command> | null;

  /**
   * Default data for the commands
   * @type {CommandsManagerDefaultOptions}
   */
  public default: CommandsManagerDefaultOptions;

  /**
   * ID of the guild where are set Applications Commands
   * @type {string | undefined}
   */
  public guildId?: Snowflake | Snowflake[];

  /**
   * Prefix for the Message Commands
   * @type {string | undefined}
   */
  public prefix?: string;

  /**
   * Constructor to manage commands
   * @param {ShewenyClient} client Client framework
   * @param {string} directory Directory of the commands folder
   * @param {CommandsManagerOptions} [options] Options of the commands manager
   */
  constructor(client: ShewenyClient, options: CommandsManagerOptions) {
    super(client, options);

    this.applicationPermissions = options?.applicationPermissions || false;
    this.autoRegisterApplicationCommands = options?.autoRegisterApplicationCommands || false;
    this.default = {
      adminOnly: options.default?.adminOnly,
      category: options.default?.category,
      channel: options.default?.channel,
      clientPermissions: options.default?.clientPermissions,
      cooldown: options.default?.cooldown,
      examples: options.default?.examples,
      type: options.default?.type,
      usage: options.default?.usage,
      userPermissions: options.default?.userPermissions,
    };
    this.guildId = options?.guildId;
    this.prefix = options?.prefix;

    if (options?.loadAll) this.loadAndRegisterAll();
  }

  /**
   * Create a command in the client's application commands
   * @param {Command} command Command to create
   * @param {Snowflake | undefined} [guildId] Guild ID where the order will be created
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
   */
  public async createCommand(
    command: Command,
    guildId?: Snowflake,
  ): Promise<ApplicationCommand<Record<string, unknown>> | ApplicationCommand<{ guild: GuildResolvable }> | undefined> {
    if (!command) throw new Error('Command not found');

    const data = this.getApplicationCommandData(command) as ApplicationCommandData;
    if (!data) return undefined;

    return guildId ? this.client.application?.commands.create(data, guildId) : this.client.application?.commands.create(data);
  }

  /**
   * Delete all commands from the client's application commands
   * @param {Snowflake | undefined} [guildId] Guild ID where all commands will be deleted
   * @returns {Promise<Collection<string, ApplicationCommand<{}>> | Collection<string, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
   */
  public async deleteAllCommands(
    guildId?: Snowflake,
  ): Promise<
    | Collection<string, ApplicationCommand<Record<string, unknown>>>
    | Collection<string, ApplicationCommand<{ guild: GuildResolvable }>>
    | undefined
  > {
    return guildId ? this.client.application?.commands.set([], guildId) : this.client.application?.commands.set([]);
  }

  /**
   * Removes an command from the client's application commands
   * @param {ApplicationCommandResolvable} command Command deleted
   * @param {Snowflake | undefined} [guildId] Guild ID where the command will be deleted
   * @returns {Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined>}
   */
  public async deleteCommand(
    command: ApplicationCommandResolvable,
    guildId?: Snowflake,
  ): Promise<ApplicationCommand<{ guild: GuildResolvable }> | null | undefined> {
    if (!command) throw new Error('Command not found');

    return guildId
      ? this.client.application?.commands.delete(command, guildId)
      : this.client.application?.commands.delete(command);
  }

  /**
   * Edit an command with a new command in the client's application commands
   * @param {ApplicationCommandResolvable} oldCommand Command edited
   * @param {Command} newCommand The new command that will take the place of the old one
   * @param {Snowflake | undefined} [guildId] Guild ID where the order will be edited
   * @returns {Promise<ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable }> | undefined>}
   */
  public async editCommand(
    oldCommand: ApplicationCommandResolvable,
    newCommand: Command,
    guildId?: Snowflake,
  ): Promise<ApplicationCommand<Record<string, unknown>> | ApplicationCommand<{ guild: GuildResolvable }> | undefined> {
    if (!oldCommand) throw new Error('Old Command not found');
    if (!newCommand) throw new Error('New Command not found');

    const data = this.getApplicationCommandData(newCommand) as ApplicationCommandData;
    if (!data) return undefined;

    return guildId
      ? this.client.application?.commands.edit(oldCommand, data, guildId)
      : this.client.application?.commands.edit(oldCommand, data);
  }

  /**
   * Get data of Application Command
   * @param {Collection<string, Command> | Command | undefined} [commands] The command(s) to obtain their data
   * @returns {ApplicationCommandData[] | ApplicationCommandData | undefined}
   */
  public getApplicationCommandData(
    commands: Collection<string, Command> | Command | undefined | null = this.commands,
  ): ApplicationCommandData[] | ApplicationCommandData | null {
    if (!commands) throw new Error('Commands not found');

    if (commands instanceof Collection) {
      const data: any[] = [];
      for (const [, cmd] of commands) {
        if (cmd.type === COMMAND_TYPE.cmdMsg) continue;

        const newType = this.renameCommandType(cmd.type);
        if (!newType) continue;

        if (cmd.type === COMMAND_TYPE.cmdSlash) {
          data.push({
            type: newType,
            name: cmd.name,
            description: cmd.description,
            options: cmd.options,
            defaultPermission:
              this.applicationPermissions && this.guildId && (cmd.userPermissions?.length > 0 || cmd.adminsOnly)
                ? false
                : cmd.defaultPermission,
          });
        } else if (cmd.type === COMMAND_TYPE.ctxMsg || cmd.type === COMMAND_TYPE.ctxUser) {
          data.push({
            type: newType,
            name: cmd.name,
            defaultPermission:
              this.applicationPermissions && this.guildId && (cmd.userPermissions?.length > 0 || cmd.adminsOnly)
                ? false
                : cmd.defaultPermission,
          });
        }
      }

      return data as ApplicationCommandData[];
    } else {
      if (commands.type === COMMAND_TYPE.cmdMsg) return null;

      const newType = this.renameCommandType(commands.type);
      if (!newType) return null;

      if (commands.type === COMMAND_TYPE.cmdSlash) {
        return {
          type: newType,
          name: commands.name,
          description: commands.description,
          options: commands.options,
          defaultPermission:
            this.applicationPermissions && this.guildId && commands.userPermissions.length > 0
              ? false
              : commands.defaultPermission,
        } as ApplicationCommandData;
      } else if (commands.type === COMMAND_TYPE.ctxMsg || commands.type === COMMAND_TYPE.ctxUser) {
        return {
          type: newType,
          name: commands.name,
          defaultPermission:
            this.applicationPermissions && this.guildId && commands.userPermissions.length > 0
              ? false
              : commands.defaultPermission,
        } as ApplicationCommandData;
      }
    }
    return null;
  }

  /**
   * Load all commands in collection
   * @returns {Promise<Collection<string, Command>>}
   */
  public async loadAll(): Promise<Collection<string, Command> | undefined> {
    const commands = await loadFiles<string, Command>(this.client, {
      directory: this.directory,
      key: 'name',
    });
    if (commands) this.client.collections.commands = commands;
    this.commands = commands;
    new ShewenyInformation(this.client, `- Commands loaded : ${this.client.collections.commands.size}`);
    return commands;
  }

  /**
   * Load all and Register Application commands
   * @returns {Promise<void>}
   */
  public async loadAndRegisterAll(): Promise<void> {
    const commands = await this.loadAll();
    const commandsToRegister = commands?.filter((cmd: Command) =>
      // @ts-ignore
      [COMMAND_TYPE.cmdSlash, COMMAND_TYPE.ctxMsg, COMMAND_TYPE.ctxUser].includes(cmd.type),
    );
    if (commandsToRegister && this.autoRegisterApplicationCommands) await this.registerApplicationCommands(commandsToRegister);
  }

  /**
   * Set all application commands from the collection of commands in the client application
   * @param {Collection<string, Command> | undefined} [commands] Collection of the commands
   * @returns {Promise<Collection<Snowflake, ApplicationCommand<{}>> | Collection<Snowflake, ApplicationCommand<{ guild: GuildResolvable }>> | undefined>}
   */
  public async registerApplicationCommands(
    commands: Collection<string, Command> | undefined | null = this.commands,
    guildId: Snowflake | Snowflake[] | undefined = this.guildId,
  ): Promise<
    | Collection<Snowflake, ApplicationCommand<Record<string, unknown>>>
    | Collection<Snowflake, ApplicationCommand<{ guild: GuildResolvable }>>
    | boolean
    | undefined
  > {
    if (guildId && guildId instanceof Array) return guildId.every(id => this.registerApplicationCommands(commands, id));
    if (!commands) throw new Error('Commands not found');
    const data = this.getApplicationCommandData();

    await this.client.awaitReady();

    if (data instanceof Array && data.length > 0) {
      const cmds =
        guildId && typeof guildId === 'string'
          ? await this.client.application?.commands.set(data, guildId)
          : await this.client.application?.commands.set(data);

      if (this.applicationPermissions) await this.registerPermissions(cmds, this.commands, guildId as string);

      return cmds;
    }
    return undefined;
  }

  /**
   * Set permissions for each commands in guild
   * @param {Collection<string, ApplicationCommand<{}>> | undefined} [applicationCommands] Commands coming from the client's application
   * @param {Collection<string, Command> | undefined} [commandsCollection] Commands coming from the collection of the commands
   * @param {Snowflake | undefined} [guildId] Guild ID where permissions will be set
   * @returns {Promise<void>}
   */
  public async registerPermissions(
    applicationCommands: Collection<string, ApplicationCommand<Record<string, unknown>>> | undefined = this.client.application
      ?.commands.cache,
    commandsCollection: Collection<string, Command> | undefined | null = this.commands,
    guildId: Snowflake | undefined,
  ): Promise<void | boolean> {
    if (!applicationCommands) throw new ReferenceError('Commands of application must be provided');
    if (!commandsCollection) throw new ReferenceError('Commands of client must be provided');
    if (!guildId) throw new ReferenceError('Guild ID must be provided');
    if (typeof guildId !== 'string') throw new TypeError('Guild ID must be a string');

    const guild = this.client.guilds.cache.get(guildId as Snowflake);
    const getRoles = (command: Command) => {
      if (!command.userPermissions?.length) return null;
      return guild?.roles.cache.filter(r => r.permissions.has(command.userPermissions));
    };

    const fullPermissions: GuildApplicationCommandPermissionData[] = [];
    for (const [, appCommand] of applicationCommands) {
      const permissions: ApplicationCommandPermissionData[] = [];
      if (commandsCollection.get(appCommand.name)?.adminsOnly) {
        // Bot admin permissions
        if (this.client.admins?.length) {
          for (const userId of this.client.admins) {
            permissions.push({
              id: userId,
              type: EnumResolvers.resolveApplicationCommandPermissionType('USER'),
              permission: true,
            });
          }
        }
      } else {
        // Guild permissions
        const roles = getRoles(commandsCollection.get(appCommand.name)!);
        // Roles in the guild
        if (roles && roles.size) {
          for (const [, role] of roles!) {
            permissions.push({
              id: role.id,
              type: EnumResolvers.resolveApplicationCommandPermissionType('ROLE'),
              permission: true,
            });
          }
        }
        // Owner of the guild
        if (guild?.ownerId) {
          permissions.push({
            id: guild.ownerId,
            type: EnumResolvers.resolveApplicationCommandPermissionType('USER'),
            permission: true,
          });
        }
        // Bot addmins for adminsOnly permission
      }

      fullPermissions.push({
        id: appCommand.id,
        permissions,
      });
    }
    await guild?.commands.permissions.set({ fullPermissions });
  }

  /**
   * Rename command type to the type of Application command
   * @param {"SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE"} type Type of command
   * @returns {ApplicationCommandType | undefined}
   */
  private renameCommandType(
    type: typeof COMMAND_TYPE.cmdSlash | typeof COMMAND_TYPE.ctxUser | typeof COMMAND_TYPE.ctxMsg,
  ): ApplicationCommandType | undefined {
    if (type === COMMAND_TYPE.cmdSlash) return EnumResolvers.resolveApplicationCommandType('CHAT_INPUT');
    if (type === COMMAND_TYPE.ctxMsg) return EnumResolvers.resolveApplicationCommandType('MESSAGE');
    if (type === COMMAND_TYPE.ctxUser) return EnumResolvers.resolveApplicationCommandType('USER');
    return undefined;
  }

  /**
   * Unload all commands
   * @returns {void}
   */
  public unloadAll(): void {
    this.commands = null;
    this.client.collections.commands.clear();
  }
}
