import { join } from 'path';
import { readdir } from 'fs/promises';
import { Client, Collection } from 'discord.js';
import { ClientUtil } from './ClientUtil';
import { ButtonsManager, CommandsManager, EventsManager, InhibitorsManager, SelectMenusManager } from '../managers';
import { ShewenyWarning } from '../helpers';
import { CLIENT_MODE } from '../constants/constants';
import type { Snowflake, ClientOptions } from 'discord.js';
import type { ShewenyClientOptions, Managers, ManagersCollections } from '../typescript/interfaces';
/**
 * Sheweny framework client
 */
export class ShewenyClient extends Client {
  /**
   * The ID of the bot admins
   * @type {Snowflake[]}
   */
  public admins: Snowflake[];

  /**
   * The collections of handlers
   * @type {ManagersCollections}
   */
  public collections: ManagersCollections;

  /**
   * If the client is ready
   * @type {boolean}
   */
  public connected: boolean;
  /**
   * The mode of the application (developement or production)
   * @type {string}
   */
  public mode?: typeof CLIENT_MODE.prod | typeof CLIENT_MODE.dev;

  /**
   * The manager of handlers
   * @type {Managers}
   */
  public managers: Managers;

  /**
   * A util tool to resolve channel, user, get data etc
   * @type {ClientUtil}
   */
  public util: ClientUtil;

  /**
   * If the client joins a Thread when created
   * @type {boolean}
   */
  public joinThreadsOnCreate: boolean;

  /**
   * Set options and your client is ready
   * @param {ShewenyClientOptions} options Client framework options
   * @param {ClientOptions} [clientOptions] Client discord.js options
   */
  constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions) {
    super(options || clientOptions);
    this.admins = options.admins || [];
    this.collections = {
      commands: new Collection(),
      events: new Collection(),
      buttons: new Collection(),
      selectMenus: new Collection(),
      inhibitors: new Collection(),
    };
    this.connected = false;
    this.joinThreadsOnCreate = options.joinThreadsOnCreate || false;
    this.managers = {
      // BUTTONS
      buttons: options.managers?.buttons
        ? new ButtonsManager(this, {
            directory: options.managers.buttons.directory,
            loadAll: options.managers.buttons.loadAll ?? true,
          })
        : undefined,

      //COMMANDS
      commands: options.managers?.commands
        ? new CommandsManager(this, {
            directory: options.managers.commands.directory,
            loadAll: true,
            guildId: options.managers.commands.guildId,
            prefix: options.managers.commands.prefix,
            applicationPermissions: options.managers.commands.applicationPermissions,
            autoRegisterApplicationCommands: options.managers.commands.autoRegisterApplicationCommands ?? true,
            default: options.managers.commands.default,
          })
        : undefined,

      // EVENTS
      events: options.managers?.events
        ? new EventsManager(this, {
            directory: options.managers.events.directory,
            loadAll: options.managers.events.loadAll ?? true,
            default: options.managers.events.default,
          })
        : undefined,

      // INHIBITORS
      inhibitors: options.managers?.inhibitors
        ? new InhibitorsManager(this, {
            directory: options.managers.inhibitors.directory,
            loadAll: options.managers.inhibitors.loadAll ?? true,
            default: options.managers.inhibitors.default,
          })
        : undefined,

      //SELECT MENUS
      selectMenus: options.managers?.selectMenus
        ? new SelectMenusManager(this, {
            directory: options.managers.selectMenus.directory,
            loadAll: options.managers.selectMenus.loadAll ?? true,
          })
        : undefined,
    };

    this.mode = options.mode || CLIENT_MODE.dev;
    this.util = new ClientUtil(this);
    if (options.mode === CLIENT_MODE.dev) new ShewenyWarning(this, 'START');

    // Load framework events
    (async () => {
      const dir = join(__dirname, '../events');
      const files = await readdir(dir);

      for (const file of files) {
        const event = await import(`${dir}/${file}`).then((e) => e.default);
        const evtName = file.split('.')[0];
        this.on(evtName, (...args) => event(this, ...args));
      }
    })();
  }

  /**
   * Return true when the client is ready
   * @returns {Promise<boolean>}
   */
  public awaitReady(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.connected) return resolve(true);
      this.once('ready', () => {
        return resolve(true);
      });
    });
  }
}
